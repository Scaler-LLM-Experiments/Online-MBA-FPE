/**
 * Script to fetch company data from Brandfetch API
 * Run with: node fetch_companies.js
 */

const fs = require('fs');

const API_KEY = 'DfkI70n7Lf6KsKdY9Q2TpefxemyY05s1wBzL9EgJ9pwAGP1xOm0TypRGmfBGUBDsl2vJ2NKIWOiyPzveQ9gq8Q';

// Companies categorized by role/industry
const COMPANIES_BY_ROLE = {
  'product-manager': [
    // Tech Product Companies
    { domain: 'netflix.com', name: 'Netflix', industry: 'Entertainment' },
    { domain: 'spotify.com', name: 'Spotify', industry: 'Music Streaming' },
    { domain: 'notion.so', name: 'Notion', industry: 'Productivity' },
    { domain: 'figma.com', name: 'Figma', industry: 'Design' },
    { domain: 'miro.com', name: 'Miro', industry: 'Collaboration' },
    { domain: 'atlassian.com', name: 'Atlassian', industry: 'Enterprise Software' },
    { domain: 'slack.com', name: 'Slack', industry: 'Communication' },
    { domain: 'zoom.us', name: 'Zoom', industry: 'Video Conferencing' },
    { domain: 'cred.club', name: 'CRED', industry: 'Fintech' },
    { domain: 'zerodha.com', name: 'Zerodha', industry: 'Stock Trading' }
  ],
  'finance': [
    // Finance & Banking
    { domain: 'hdfcbank.com', name: 'HDFC Bank', industry: 'Banking' },
    { domain: 'icicibank.com', name: 'ICICI Bank', industry: 'Banking' },
    { domain: 'goldmansachs.com', name: 'Goldman Sachs', industry: 'Investment Banking' },
    { domain: 'jpmorgan.com', name: 'JPMorgan', industry: 'Investment Banking' },
    { domain: 'paytm.com', name: 'Paytm', industry: 'Payments' },
    { domain: 'razorpay.com', name: 'Razorpay', industry: 'Payments' },
    { domain: 'phonepe.com', name: 'PhonePe', industry: 'Fintech' },
    { domain: 'stripe.com', name: 'Stripe', industry: 'Payments' },
    { domain: 'coinbase.com', name: 'Coinbase', industry: 'Crypto' },
    { domain: 'cleartax.in', name: 'ClearTax', industry: 'Tax Tech' }
  ],
  'sales': [
    // Sales & Growth
    { domain: 'salesforce.com', name: 'Salesforce', industry: 'CRM' },
    { domain: 'hubspot.com', name: 'HubSpot', industry: 'Marketing & Sales' },
    { domain: 'freshworks.com', name: 'Freshworks', industry: 'SaaS' },
    { domain: 'zoho.com', name: 'Zoho', industry: 'Business Software' },
    { domain: 'gong.io', name: 'Gong', industry: 'Revenue Intelligence' },
    { domain: 'airbnb.com', name: 'Airbnb', industry: 'Travel' },
    { domain: 'uber.com', name: 'Uber', industry: 'Mobility' },
    { domain: 'ola.com', name: 'Ola', industry: 'Mobility' },
    { domain: 'booking.com', name: 'Booking.com', industry: 'Travel' },
    { domain: 'makemytrip.com', name: 'MakeMyTrip', industry: 'Travel' }
  ],
  'marketing': [
    // Marketing & Growth
    { domain: 'google.com', name: 'Google', industry: 'Tech & Advertising' },
    { domain: 'meta.com', name: 'Meta', industry: 'Social Media' },
    { domain: 'amazon.com', name: 'Amazon', industry: 'E-commerce' },
    { domain: 'flipkart.com', name: 'Flipkart', industry: 'E-commerce' },
    { domain: 'meesho.com', name: 'Meesho', industry: 'Social Commerce' },
    { domain: 'swiggy.com', name: 'Swiggy', industry: 'Food Delivery' },
    { domain: 'zomato.com', name: 'Zomato', industry: 'Food Tech' },
    { domain: 'blinkit.com', name: 'Blinkit', industry: 'Quick Commerce' },
    { domain: 'mailchimp.com', name: 'Mailchimp', industry: 'Email Marketing' },
    { domain: 'canva.com', name: 'Canva', industry: 'Design Platform' }
  ],
  'operations': [
    // Operations & Supply Chain
    { domain: 'ups.com', name: 'UPS', industry: 'Logistics' },
    { domain: 'fedex.com', name: 'FedEx', industry: 'Logistics' },
    { domain: 'dhl.com', name: 'DHL', industry: 'Logistics' },
    { domain: 'maersk.com', name: 'Maersk', industry: 'Shipping' },
    { domain: 'walmart.com', name: 'Walmart', industry: 'Retail' },
    { domain: 'target.com', name: 'Target', industry: 'Retail' },
    { domain: 'shopify.com', name: 'Shopify', industry: 'E-commerce Platform' },
    { domain: 'delhivery.com', name: 'Delhivery', industry: 'Logistics' },
    { domain: 'dunzo.com', name: 'Dunzo', industry: 'Quick Commerce' },
    { domain: 'bigbasket.com', name: 'BigBasket', industry: 'Grocery Delivery' }
  ],
  'founder': [
    // Startups & Innovation
    { domain: 'microsoft.com', name: 'Microsoft', industry: 'Technology' },
    { domain: 'apple.com', name: 'Apple', industry: 'Technology' },
    { domain: 'tesla.com', name: 'Tesla', industry: 'Electric Vehicles' },
    { domain: 'openai.com', name: 'OpenAI', industry: 'AI Research' },
    { domain: 'stripe.com', name: 'Stripe', industry: 'Payments' },
    { domain: 'razorpay.com', name: 'Razorpay', industry: 'Payments' },
    { domain: 'postman.com', name: 'Postman', industry: 'API Platform' },
    { domain: 'hasura.io', name: 'Hasura', industry: 'GraphQL' },
    { domain: 'browserstack.com', name: 'BrowserStack', industry: 'Testing' },
    { domain: 'chargebee.com', name: 'Chargebee', industry: 'Billing' }
  ]
};

// Helper function to lighten color
function lightenColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.floor(((num >> 16) & 0xff) + (255 - ((num >> 16) & 0xff)) * percent));
  const g = Math.min(255, Math.floor(((num >> 8) & 0xff) + (255 - ((num >> 8) & 0xff)) * percent));
  const b = Math.min(255, Math.floor((num & 0xff) + (255 - (num & 0xff)) * percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

async function fetchCompanyData(domain) {
  try {
    const response = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${domain}: ${response.status}`);
      return null;
    }

    const data = await response.json();

    // Extract logo
    const logoUrl = data.logos?.[0]?.formats?.[0]?.src ||
                    `https://cdn.brandfetch.io/${domain}/w/400`;

    // Extract primary brand color
    const primaryColor = data.colors?.[0]?.hex ||
                         data.theme?.colors?.[0]?.hex ||
                         '#F8F8F8';

    // Use full brand color (no lightening) since logos are white SVGs
    const backgroundColor = primaryColor;

    return {
      domain,
      logoUrl,
      primaryColor,
      backgroundColor
    };
  } catch (error) {
    console.error(`Error fetching ${domain}:`, error.message);
    return null;
  }
}

async function fetchAllCompanies() {
  const results = {};

  for (const [role, companies] of Object.entries(COMPANIES_BY_ROLE)) {
    console.log(`\nFetching data for ${role}...`);
    results[role] = [];

    for (const company of companies) {
      console.log(`  - ${company.name} (${company.domain})`);
      const data = await fetchCompanyData(company.domain);

      if (data) {
        results[role].push({
          name: company.name,
          industry: company.industry,
          domain: company.domain,
          logoUrl: data.logoUrl,
          primaryColor: data.primaryColor,
          backgroundColor: data.backgroundColor
        });
      } else {
        // Fallback if API fails
        results[role].push({
          name: company.name,
          industry: company.industry,
          domain: company.domain,
          logoUrl: `https://cdn.brandfetch.io/${company.domain}/w/400`,
          primaryColor: '#F8F8F8',
          backgroundColor: '#F8F8F8'
        });
      }

      // Rate limiting - wait 500ms between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Save to JSON file
  const outputPath = './transformation_companies.json';
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Data saved to ${outputPath}`);

  // Print summary
  console.log('\n📊 Summary:');
  for (const [role, companies] of Object.entries(results)) {
    console.log(`  ${role}: ${companies.length} companies`);
  }
  console.log(`  Total: ${Object.values(results).flat().length} companies`);
}

// Run the script
fetchAllCompanies().catch(console.error);
