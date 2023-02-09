import { useState } from "react";
import { useApi } from "../utils/useApi";
import AddIcon from "@mui/icons-material/AddRounded";
// import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

export const TorontoPkgsApi = () => {
  const results = useApi(
    "https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_list"
  );

  const ColorPicker = () => {
    const [color, setColor] = useState("#FFFFFF");

    return (
      <input
        type="color"
        title="Pick color"
        className="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      ></input>
    );
  };

  return (
    <div className="right-menu-body">
      <ul>
        {Boolean(results.length) &&
          results.map((result, index) => {
            const key = `${result}${index}`;
            return (
              <li key={key} className="right-menu-table-two-rows" title="Add">
                <h4 className="effect">{result}</h4>
                <div className="end">
                  <ColorPicker />
                  <AddIcon />
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
