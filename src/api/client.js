import axios from 'axios';

/**
 * Axios client instance configured for the education API
 */
const apiClient = axios.create({
    baseURL: 'https://podo.b1.ma/api/public',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request interceptor
 * Add any authentication tokens or custom headers here
 */
apiClient.interceptors.request.use(
    (config) => {
        // Add any request modifications here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor
 * Handle common response patterns and errors
 */
apiClient.interceptors.response.use(
    (response) => {
        // Extract data from the API response format: { success: true, data: [...] }
        if (response.data && response.data.success && response.data.data !== undefined) {
            return response.data.data;
        }
        return response.data;
    },
    (error) => {
        // Handle common error patterns
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        return Promise.reject(new Error(errorMessage));
    }
);

export default apiClient;
