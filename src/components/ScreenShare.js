export default function ScreenShare({ socket, roomId }) {
  const shareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      // This only triggers a notification in other clients for now.
      socket.emit("screen-share", { roomId });
      // You could replace the camera track in your RTCPeerConnection here.
      stream.getTracks().forEach((t) => {
        // placeholder for advanced integration
      });
    } catch (e) {
      console.error("Screen share failed", e);
    }
  };

  return <button onClick={shareScreen} style={{ marginTop: 8 }}>Share Screen</button>;
}
