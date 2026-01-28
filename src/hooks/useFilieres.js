import { useState, useEffect } from "react";
import { fetchFilieres } from "../services/filieresService";

/**
 * Custom hook to fetch and manage filieres data for a specific year
 * @param {number|null} yearId - The ID of the selected year
 * @returns {Object} { filieres, loading, error }
 */
export const useFilieres = (yearId) => {
    const [filieres, setFilieres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Don't fetch if no year is selected
        if (!yearId) {
            setFilieres([]);
            setLoading(false);
            setError(null);
            return;
        }

        const loadFilieres = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch data using the service layer
                const data = await fetchFilieres(yearId);

                setFilieres(data);
            } catch (err) {
                setError(err.message || "Failed to load filieres");
                setFilieres([]); // Clear filieres on error
            } finally {
                setLoading(false);
            }
        };

        loadFilieres();
    }, [yearId]); // Re-fetch when yearId changes

    return { filieres, loading, error };
};
