import { useState, FC } from "react";
import AddIcon from "@mui/icons-material/AddRounded";
import { MenuButton } from "./menu-button";

interface Props {
  toggleOsm: (arg: boolean) => void;
}

export const UploadObjects = () => {

  const [name, setName] = useState("");
  const [ID, setID] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [masl, setMASL] = useState("");
  const [rotation, setRotation] = useState("");
  const [file, setFile] = useState("");

  const clickHandler = () => {
    alert(`Object entered ${name}, ${ID}`);
    setName("");
    setID("");
    setLatitude("");
    setLongitude("");
    setMASL("");
    setRotation("");
    setFile("");
  }

  return (
    <form>
      <label>
        Object Name: 
        <input
          value={name}
          onChange={
            (event) => {
              setName(event.target.value)
            }
          }
        ></input>
      </label>
      <label>
        Object ID: 
        <input
          value={ID}
            onChange={
              (event) => {
                setID(event.target.value)
              }
            }
        ></input>
      </label>
      <label>
        Object Latitude: 
        <input
          value={latitude}
          onChange={
            (event) => {
              setLatitude(event.target.value)
            }
          }
        ></input>
      </label>
      <label>
        Object Longitude: 
        <input
          value={longitude}
          onChange={
            (event) => {
              setLongitude(event.target.value)
            }
          }
        ></input>
      </label>
      <label>
        Object Rotation: 
        <input
          value={rotation}
          onChange={
            (event) => {
              setRotation(event.target.value)
            }
          }
        ></input>
      </label>
      <label>
        Object Meters Above Sea Level (MASL): 
        <input
          value={masl}
          onChange={
            (event) => {
              setMASL(event.target.value)
            }
          }
        ></input>
      </label>
      <label>
            Model file: 
            <input
              value={file}
              onChange={
                  (event) => {
                  setFile(event.target.value)
                  }
              }
            ></input>
      </label>
      <button onClick={clickHandler}>Upload object</button>
    </form>
  );
};