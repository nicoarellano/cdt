import { useApi } from "../utils/useApi";

export const TorontoPkgsApi = () => {
  const results = useApi(
    "https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_list"
  );

  return (
    <div>
      <select>
        {Boolean(results.length) &&
          results.map((result, index) => {
            const key = `${result}${index}`;
            return <option key={key}>{result}</option>;
          })}
      </select>
      <ul>
        {Boolean(results.length) &&
          results.map((result, index) => {
            const key = `${result}${index}`;
            return <li key={key}>{result}</li>;
          })}
      </ul>
    </div>
  );
};
