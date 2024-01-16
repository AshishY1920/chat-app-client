import React, { useState } from "react";
import "./Join.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

let user;
const Join = () => {
  const navigate = useNavigate();
  const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
    navigate("/chat");
  };

  const [name, setName] = useState("");
  return (
    <div className="join_wrapper">
      <div className="join_container">
        <h1>JOIN PAGE</h1>
        <form onSubmit={sendUser}>
          <label htmlFor="">Enter Username</label> <br />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="joinInput"
            placeholder="Enter Username"
          />{" "}
          <br />
          <Button type="submit" disabled={name === "" ? true : false}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Join;
export { user };
