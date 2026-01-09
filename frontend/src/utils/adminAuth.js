/**
 * Utility functions for admin authentication and API requests
 */

/**
 * Constructs the API URL for admin endpoints
 * @param {string} cacheKey - The cache key (response_id)
 * @returns {string} The API URL
 * @throws {Error} If cacheKey is not provided
 */
export const getApiUrl = (cacheKey) => {
  if (!cacheKey) {
    throw new Error('Response ID is required');
  }
  // API is proxied through /career-profile-tool/api/ by nginx
  return `/career-profile-tool/api/admin/view/response/${cacheKey}`;
};

/**
 * Creates a Basic Authentication header value
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {string} The Basic Auth header value
 */
export const createBasicAuthHeader = (username, password) => {
  return `Basic ${btoa(`${username}:${password}`)}`;
};

/**
 * Generates admin token from credentials (SHA256 hash)
 * This token can be used in query parameter or header, works better with CloudFront
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {Promise<string>} The admin token
 */
export const generateAdminToken = async (username, password) => {
  const message = `${username}:${password}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

/**
 * Parses an error response from the server
 * Handles both JSON and HTML responses
 * @param {Response} response - The fetch Response object
 * @returns {Promise<Object>} Parsed error object with detail message
 */
export const parseErrorResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  let errorText = '';
  
  try {
    errorText = await response.text();
  } catch (e) {
    console.error('Failed to read error response:', e);
  }
  
  // Try to parse as JSON if content-type indicates JSON
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(errorText);
    } catch (parseError) {
      console.error('Failed to parse JSON error:', parseError);
      return { detail: `Request failed with status ${response.status}` };
    }
  }
  
  if (response.status === 401) {
    return { detail: 'Invalid authentication credentials. Please check your username and password.' };
  }
  if (response.status === 404) {
    return { detail: 'Response not found for the given ID' };
  }
  return { detail: `Request failed with status ${response.status}. Server returned ${contentType || 'unknown format'}.` };
};

/**
 * Validates that the response is JSON
 * @param {Response} response - The fetch Response object
 * @throws {Object} Error object if response is not JSON
 */
export const validateJsonResponse = (response) => {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw {
      response,
      responseJson: { detail: `Server returned non-JSON response (${contentType}). Please check the server configuration.` }
    };
  }
};

/**
 * Checks if an error is an authentication error
 * @param {Object} err - The error object
 * @returns {boolean} True if it's an authentication error
 */
export const isAuthError = (err) => {
  return err.response?.status === 401 ||
    err.responseJson?.detail?.includes('authentication') ||
    err.responseJson?.detail?.includes('Invalid') ||
    err.responseJson?.detail?.includes('Authentication required');
};

/**
 * Fetches admin response data with Basic Authentication
 * @param {string} cacheKey - The cache key (response_id)
 * @param {string} username - Admin username
 * @param {string} password - Admin password
 * @param {Object} callbacks - Callback functions for state updates
 * @param {Function} callbacks.onLoadingChange - Called with loading state
 * @param {Function} callbacks.onSuccess - Called with fetched data
 * @param {Function} callbacks.onError - Called with error object
 * @param {Function} callbacks.onAuthError - Called with error details for auth errors
 * @returns {Promise<void>}
 */
export const fetchAdminResponse = async (cacheKey, username, password, callbacks = {}) => {
  const {
    onLoadingChange = () => {},
    onSuccess = () => {},
    onError = () => {},
    onAuthError = () => {},
  } = callbacks;

  try {
    onLoadingChange(true);

    // Validate credentials
    if (!username || !password) {
      onAuthError({ detail: 'Please enter both username and password' });
      onLoadingChange(false);
      return;
    }

    // Construct URL and credentials
    let url = getApiUrl(cacheKey);
    const authHeader = createBasicAuthHeader(username, password);
    
    // Generate admin token as fallback (works better with CloudFront)
    const adminToken = await generateAdminToken(username, password);
    
    // Try with token in query parameter first (CloudFront-friendly)
    // If that fails, fallback to Basic Auth
    const urlWithToken = `${url}?admin_token=${adminToken}`;

    // Make the request with token (CloudFront forwards query strings)
    let response = await fetch(urlWithToken, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    });
    
    // If token auth fails, try Basic Auth as fallback
    if (response.status === 401) {
      console.log('Token auth failed, trying Basic Auth...');
      response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });
    }

    // Handle error responses
    if (!response.ok) {
      const errorJson = await parseErrorResponse(response);
      throw { response, responseJson: errorJson };
    }

    // Validate and parse success response
    validateJsonResponse(response);
    const result = await response.json();

    
    // Call success callback
    onSuccess(result);
    onLoadingChange(false);
  } catch (err) {
    console.error('Failed to fetch response:', err);
    // Determine error type and call appropriate callback
    if (isAuthError(err)) {
      onAuthError(err.responseJson || { detail: 'Invalid username or password. Please try again.' });
    } else if (err.response?.status === 404) {
      onError(err.responseJson || { detail: 'Response not found for the given ID.' });
    } else {
      onAuthError(
        err.responseJson || 
        { detail: err.message || 'Failed to authenticate. Please check your credentials and try again.' }
      );
    }
    
    onLoadingChange(false);
  }
};

