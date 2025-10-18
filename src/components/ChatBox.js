import React, { useState, useEffect } from "react";

export default function ChatBox({ socket, roomId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("chat-message", (msg) => setMessages((prev) => [...prev, msg]));
  }, [socket]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("chat-message", input);
    setMessages((prev) => [...prev, `Me: ${input}`]);
    setInput("");
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Chat</h3>
      <div style={{ border: "1px solid #ccc", height: 140, overflowY: "auto", padding: 8 }}>
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
      <div style={{ marginTop: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
