//
// Utility (Service) for communicating with the Freepik API.
// Fetches illustrated images using environment variable for API key.
// Note: Freepik API documentation: https://developer.freepik.com/docs
//
// Official Freepik API is mainly for partners and may need `Bearer` token in headers.
//

const API_KEY = process.env.REACT_APP_FREEPIK_API_KEY;
const BASE_URL = 'https://api.freepik.com/v1/resources';

/**
 * Transform the Freepik response to return only needed info.
 */
function transformFreepikResponse(json) {
  return (json.data || []).map(item => ({
    id: item.id,
    url: item.assets?.preview_url,
    title: item.title,
    author: item.author,
    tags: item.tags
  }));
}

// PUBLIC_INTERFACE
/**
 * Search Freepik for illustrated images.
 * @param {string} query Search term (e.g., "burger", "pizza").
 * @param {number} [limit=20] Max results to return.
 * @returns {Promise<Array>} Resolves to an array of illustration info.
 */
export async function fetchFreepikIllustrations(query, limit = 20) {
  /** This is a public function. */
  const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&limit=${limit}`;
  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  if (!resp.ok) throw new Error('Freepik API error');
  const json = await resp.json();
  return transformFreepikResponse(json);
}
