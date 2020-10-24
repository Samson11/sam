import React from 'react';
import Snipper from './snipper';
import Header from '../header/header';
import Button from '@material-ui/core/Button';
import './screenshot.scss';

const Screenshot = () => {
  const a = navigator.mediaDevices.getDisplayMedia();
  console.log(a)

  const takeScreenshot = async() => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen' }
    })

    const track = stream.getVideoTracks()[0];
    const image = new ImageCapture(track);
    const bitmap = await image.grabFrame();
    track.stop();

    const canvas = document.getElementById('screenshot')
    canvas.width = bitmap.width;
    canvas.height = bitmap.height
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 0, 790, bitmap.height / 2)
    const img = canvas.toDataURL()
    const res = await fetch(img)
    const buff = await res.arrayBuffer()
    const file = [
      new File([buff], `photo_${new Date()}.jpg`, { type: 'image/jpeg' })
    ]
    return file;
  }

  return (
    <div>
      <Header title="Screenshot" />
      {/**<Snipper />*/}
      <canvas id="screenshot"></canvas>
      <div id="frame"></div>
      <p className="little--space" />
      <Button variant="outlined" color="primary" onClick={takeScreenshot}>Take screenshot</Button>
    </div>
  )
}

export default Screenshot;
