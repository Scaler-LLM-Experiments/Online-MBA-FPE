import { nanoquery } from '@nanostores/query';
import { apiRequest, generateJWT } from '../utils/api';
import { addMeta } from '../utils/dom';

export const [createFetcherStore, , { mutateCache }] = nanoquery({
  fetcher: async () => {
    // ========================================
    // LOCAL DEV MODE: Skip authentication
    // ========================================
    // TODO: Uncomment the code below when deploying to production
    return {
      isLoggedIn: true,
      isPhoneVerified: true,
      userData: {
        id: 'local-dev-user',
        name: 'Local Developer',
        email: 'dev@localhost.com',
        phone: '+1234567890',
        phone_verified: true
      }
    };

    // ========================================
    // PRODUCTION MODE: Real authentication
    // ========================================
    /*
    const { csrf_token: csrfToken } =
      (await apiRequest(
        'GET',
        '/csrf-token'
      )) || {};

    if (csrfToken) addMeta('csrf-token', csrfToken);

    const token = await generateJWT();
    if (!token) throw new Error('Failed to load JWT');

    const {
      data: { attributes }
    } = await apiRequest(
      'GET',
      '/api/v3/users',
      null,
      {
        headers: {
          'X-User-Token': token
        }
      }
    );

    const result = {
      isLoggedIn: true,
      isPhoneVerified: Boolean(attributes?.phone_verified),
      userData: attributes ?? null
    };
    return result;
    */
  },

  onError: (error) => {
    console.error('Error fetching initial data:', error);
  },
  dedupeTime: Infinity,
  cacheLifetime: Infinity,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateInterval: 0,
  onErrorRetry: null
});

const defaultInitialData = {
  isLoggedIn: true,  // Changed to true for local dev
  isPhoneVerified: true,  // Changed to true for local dev
  userData: {
    id: 'local-dev-user',
    name: 'Local Developer',
    email: 'dev@localhost.com'
  }
};

export const $initialData = createFetcherStore(['/auth']);
mutateCache('/auth', defaultInitialData);
