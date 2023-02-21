import { useState } from "react";

export const UploadPlaces = () => {

  const [name, setName] = useState("");
  const [ID, setID] = useState("");
  const [area, setArea] = useState("");

  const clickHandler = () => {
    console.log("Place entered - ", name, ID, area);
    setName("");
    setID("");
    setArea("");
  }

  return (
    <form>
      <label>
        Place Name: 
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
        Place ID: 
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
        Place Area: 
        <input
          value={area}
          onChange={
            (event) => {
              setArea(event.target.value)
            }
          }
        ></input>
      </label>
      <button onClick={clickHandler}>Upload Place</button>
    </form>
  );
};
