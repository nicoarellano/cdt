import { useState, useEffect } from "react";

export const TorontoPkgsApi = () => {
  const [pkgs, setPkgs] = useState([]);

  useEffect(() => {
    const fetchPkgs = async () => {
      const response = await fetch(
        "https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_list"
      );
      if (response) {
        const data = await response.json();

        const newPkgs = [];
        for (const result of data.result) {
          newPkgs.push(result);
        }
        setPkgs(newPkgs);
      }
    };

    fetchPkgs();
  }, []);

  return (
    <div className="hidden">
      <select>
        {Boolean(pkgs.length) &&
          pkgs.map((pkg, index) => {
            const key = `${pkg}${index}`;
            return <option key={key}>{pkg}</option>;
          })}
      </select>
      <ul>
        {Boolean(pkgs.length) &&
          pkgs.map((pkg, index) => {
            const key = `${pkg}${index}`;
            return <li key={key}>{pkg}</li>;
          })}
      </ul>
    </div>
  );
};
