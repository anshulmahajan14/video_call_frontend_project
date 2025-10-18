export default function Controls({ localVideo }) {
  const toggleAudio = () => {
    const stream = localVideo.current?.srcObject;
    const audioTrack = stream?.getTracks().find((t) => t.kind === "audio");
    if (audioTrack) audioTrack.enabled = !audioTrack.enabled;
  };

  const toggleVideo = () => {
    const stream = localVideo.current?.srcObject;
    const videoTrack = stream?.getTracks().find((t) => t.kind === "video");
    if (videoTrack) videoTrack.enabled = !videoTrack.enabled;
  };

  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={toggleAudio}>Toggle Mic</button>
      <button onClick={toggleVideo} style={{ marginLeft: 8 }}>Toggle Video</button>
    </div>
  );
}
