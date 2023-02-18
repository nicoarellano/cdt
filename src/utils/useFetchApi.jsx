import { useState, useEffect } from "react";

export const useFetchApi = (url) => {
  const [result, setResult] = useState(null);

  console.log(url);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(url);
      if (response) {
        const data = await response.json();
        const result = await data.result;
        setResult(result);
      }
    };

    fetchResults();
  }, [url]);

  return result;
};
