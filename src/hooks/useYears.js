import { useState, useEffect } from "react";
import { getYears } from "../api/educationService";

/**
 * Custom hook to fetch and manage education years data
 * @returns {Object} { years, loading, error }
 */
export const useYears = () => {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadYears = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data using the centralized service layer
        const data = await getYears();

        // Sort by order to ensure consistent display
        const sortedData = data.sort((a, b) => a.order - b.order);
        setYears(sortedData);
      } catch (err) {
        setError(err.message || "Failed to load education years");
        setYears([]); // Clear years on error
      } finally {
        setLoading(false);
      }
    };

    loadYears();
  }, []);

  return { years, loading, error };
};
