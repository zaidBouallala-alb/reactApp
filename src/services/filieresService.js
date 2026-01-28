/**
 * Filieres API Service
 * Handles all API calls related to filieres (courses/programs) data
 */

const API_BASE_URL = 'https://podo.b1.ma/api/public';

/**
 * Fetches filieres for a specific education year
 * @param {number} yearId - The ID of the education year
 * @returns {Promise<Array>} Array of filiere objects
 * @throws {Error} If the API request fails
 */
export const fetchFilieres = async (yearId) => {
    if (!yearId) {
        throw new Error('Year ID is required');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/years/${yearId}/filieres`);

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
        throw new Error('Failed to fetch filieres data');
    }
};

/**
 * API service object for potential future expansion
 */
export const filieresService = {
    fetchFilieres,
};

export default filieresService;
