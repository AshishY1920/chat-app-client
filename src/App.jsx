import React from "react";
// import socketIO from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Component/Join/Join";
import "./App.css";
import Chat from "./Component/Chat/Chat";

// const ENDPOINT = `http://localhost:8000/`;
// const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const App = () => {
  // socket.on("connect", () => {});
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
