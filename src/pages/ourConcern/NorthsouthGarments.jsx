import ConcernPageTemplate from "./ConcernPageTemplate";
import { useEffect, useState } from "react";
import axios from "axios"; // Make sure to install axios: npm install axios or yarn add axios

const NorthsouthGarments = () => {
  const [concernData, setConcernData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the unique slug for this specific concern page
  const concernSlug = "northsouth-garments";

  useEffect(() => {
    const fetchConcernData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Replace with your actual backend API URL for concerns
        const response = await axios.get(`/api/concerns/${concernSlug}`);
        setConcernData(response.data);
      } catch (err) {
        setError("Failed to load concern data. Please try again later.");
        console.error("Error fetching concern data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConcernData();
  }, [concernSlug]); // Re-fetch if slug changes (though it's static here)

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading concern details...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-600">Error: {error}</div>;
  }

  if (!concernData) {
    return <div className="flex justify-center items-center h-screen text-xl">No data found for Northsouth Garments.</div>;
  }

  return (
    <ConcernPageTemplate
      {...concernData} // Pass all fetched data as props
    />
  );
};

export default NorthsouthGarments;
