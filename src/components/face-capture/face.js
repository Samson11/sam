import React from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Fab from '@material-ui/core/Fab';
import './face.scss';

const Face = () => {
  const myVideo = document.createElement('video');
  myVideo.className = 'video'
  myVideo.muted = true;

  const addVideoStream = (video, stream) => {
    const videoGrid = document.getElementById('video-grid')
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => video.play())
    videoGrid.append(video)
  }

  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => addVideoStream(myVideo, stream))
  .catch(() => {})
  return (
    <div id="video-grid">
      <Fab variant="extended" className="fab-bottom">
        <PhotoCameraIcon />
        Take Photo
      </Fab>
    </div>
  )
}

export default Face;
