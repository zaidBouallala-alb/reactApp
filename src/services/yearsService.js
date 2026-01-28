/**
 * Years API Service
 * Handles all API calls related to education years data
 */

const API_BASE_URL = 'https://podo.b1.ma/api/public';

/**
 * Fetches all education years from the API
 * @returns {Promise<Array>} Array of year objects
 * @throws {Error} If the API request fails
 */
export const fetchYears = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/years`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    
    // The API returns data in format: { success: true, data: [...] }
    if (!result.success || !result.data) {
      throw new Error('Invalid API response format');
    }
    
    return result.data;
  } catch (error) {
    // Re-throw with more context
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch years data');
  }
};

/**
 * API service object for potential future expansion
 */
export const yearsService = {
  fetchYears,
};

export default yearsService;
