import { useApi } from "../utils/useApi";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
// import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

export const TorontoPkgsApi = () => {
  const results = useApi(
    "https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_list"
  );

  return (
    <div className="right-menu-body">
      <ul>
        {Boolean(results.length) &&
          results.map((result, index) => {
            const key = `${result}${index}`;
            return (
              <li key={key} className="right-menu-table-two-rows" title="Add">
                <h4 className="effect">{result}</h4>
                <AddRoundedIcon />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
