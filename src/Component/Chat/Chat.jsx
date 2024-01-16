import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = "http://localhost:8000/";

let socket;

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  console.log("Messages: ", messages);

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      // alert("Connected");
      setId(socket.id);
    });

    // sending data in backend
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log("DATA:", data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log("DATA:", data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log("LEAVE: ", data.user, data.message);
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log("CHAT DATA:", data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);
  return (
    <div className="chat_wrapper">
      <div className="chat_container">
        <div className="chat_header">
          <p>{user}</p>
        </div>
        <ReactScrollToBottom className="chatting_container">
          {messages &&
            messages.map((i) => (
              <Message
                user={i.id === id ? "" : i.user}
                message={i.message}
                classs={i.id === id ? "right" : "left"}
              />
            ))}
        </ReactScrollToBottom>
        <div className="chat_footer">
          <div className="flex-row">
            <div>
              <input
                onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
                type="text"
                id="chatInput"
                placeholder="Say Something"
              />
            </div>
            <div>
              <Button type="submit" onClick={send}>
                <SendIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
