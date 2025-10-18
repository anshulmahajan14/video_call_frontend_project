export function initWebRTC(socket, roomId, userId, localStream, remoteVideo) {
  const peer = new RTCPeerConnection();

  localStream.getTracks().forEach((track) => peer.addTrack(track, localStream));

  peer.ontrack = (event) => {
    if (remoteVideo.current) {
      remoteVideo.current.srcObject = event.streams[0];
    }
  };

  socket.emit("join-room", { roomId, userId });

  socket.on("offer", async (data) => {
    await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    socket.emit("answer", { answer, roomId });
  });

  socket.on("answer", async (data) => {
    await peer.setRemoteDescription(new RTCSessionDescription(data.answer));
  });

  socket.on("ice-candidate", async (data) => {
    try {
      await peer.addIceCandidate(new RTCIceCandidate(data.candidate));
    } catch (e) {
      console.error("Error adding ICE candidate", e);
    }
  });

  peer.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", { candidate: event.candidate, roomId });
    }
  };

  async function startOffer() {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socket.emit("offer", { offer, roomId });
  }

  startOffer();
}
