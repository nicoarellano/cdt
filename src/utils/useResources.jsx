import { useState, useEffect } from "react";

export const useResources = (resourceId, limit = 100) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const url = `https://ckan0.cf.opendata.inter.prod-toronto.ca/ca/api/3/action/datastore_search?resource_id=${resourceId}&limit=${limit}`;
    const fetchResources = async () => {
      const response = await fetch(url);
      if (response) {
        const data = await response.json();
        const result = data.result;
        const records = result.records;
        const recordsList = [];
        for (const record of records) {
          recordsList.push(record);
        }
        setResources(recordsList);
      }
    };

    fetchResources();
  }, [resourceId]);

  return resources;
};
