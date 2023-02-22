import React from "react";
import { useState, FC} from "react";
import { UploadObjects } from "./uploadObjects";
import { UploadPlaces } from "./uploadPlaces";
import AddIcon from "@mui/icons-material/AddRounded";
import { MenuButton } from "./menu-button";

export const Upload= () => {
  
  const [openPlace, setOpenPlace] = useState(false);
  const [openObject, setOpenObject] = useState(false);

  const handleClickPlace = () => {
    if(openPlace) {
      setOpenPlace(false)
    }else{
      setOpenPlace(true)
    };
  };

  const handleClickObjects = () => {
    if(openObject) {
      setOpenObject(false)
    }else{
      setOpenObject(true)
    };
  };

  return (
    <React.Fragment>
      <div id="upload-container" title="Upload" className="right-menu-body">
        <button onClick={handleClickPlace}>Places</button>
        {openPlace && <UploadPlaces/>}

        <button onClick={handleClickObjects}>Objects</button>
        {openObject && <UploadObjects/>}
      </div>
      
    </React.Fragment>
  );
};
