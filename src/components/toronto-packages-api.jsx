import { useApi } from "../utils/useApi";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export const TorontoPkgsApi = () => {
  const results = useApi(
    "https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_list"
  );

  return (
    <div className="hidden">
      <h3>Data</h3>
      <ul>
        {Boolean(results.length) &&
          results.map((result, index) => {
            const key = `${result}${index}`;
            return (
              <li key={key} className="row space-between" title="Add">
                <h4>{result}</h4>
                <AddRoundedIcon />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
