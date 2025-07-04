//
// Utility (Service) for communicating with the Pixabay image API.
// Fetches food images using environment variable for API key.
//
const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';

// PUBLIC_INTERFACE
/**
 * Search Pixabay for food images.
 * @param {string} query The food-related search string (e.g., "burger", "apple").
 * @param {number} [perPage=20] Number of results per page.
 * @returns {Promise<Array>} Resolves to array of image objects.
 */
export async function fetchPixabayImages(query, perPage = 20) {
  /** This is a public function. */
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&category=food&per_page=${perPage}&safesearch=true`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Pixabay API error');
  const json = await resp.json();
  return json.hits || [];
}
