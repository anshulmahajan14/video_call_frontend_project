import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import ChatBox from "./ChatBox";
import Controls from "./Controls";
import ScreenShare from "./ScreenShare";
import { initWebRTC } from "../utils/webrtc";

const socket = io(process.env.REACT_APP_BACKEND_URL, { transports: ['websocket'] });

export default function VideoCall() {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const [roomId] = useState("default-room");
  const [userId] = useState(uuidv4());

  useEffect(() => {
    async function setup() {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideo.current) localVideo.current.srcObject = localStream;
      initWebRTC(socket, roomId, userId, localStream, remoteVideo);
    }
    setup();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", gap: 12 }}>
        <video ref={localVideo} autoPlay playsInline muted style={{ width: 320, background: "#000" }} />
        <video ref={remoteVideo} autoPlay playsInline style={{ width: 320, background: "#000" }} />
      </div>
      <Controls localVideo={localVideo} />
      <ScreenShare socket={socket} roomId={roomId} />
      <ChatBox socket={socket} roomId={roomId} />
    </div>
  );
}
