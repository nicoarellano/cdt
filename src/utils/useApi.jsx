import { useState, useEffect } from "react";

export const useApi = (url) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(url);
      if (response) {
        const data = await response.json();

        const resultsList = [];
        for (const result of data.result) {
          resultsList.push(result);
        }
        setResults(resultsList);
      }
    };

    fetchResults();
  }, [url]);

  return results;
};
