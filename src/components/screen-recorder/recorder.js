import React, { useState, Component } from 'react';
import StopIcon from '@material-ui/icons/Stop';
import IconButton from '@material-ui/core/IconButton';
import Header from '../header/header';
import PauseIcon from '@material-ui/icons/Pause';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const { ipcRenderer } = window.require('electron');

const recordedChunks = [];

class Recorder extends Component {
  state = {
    open: false,
    rec: false,
    stream: null,
    id: null,
    duration: 10000,
    recState: 'notbegun'
  }

  componentDidMount() {
    const id = this.props.location.pathname.split('/record/')[1]
    this.setState({ id })
  }

  render() {
    let mediaRecorder;
    const options = { mimeType: 'video/webm; codecs=vp9' };
    const videoElement = document.querySelector('video');

    const startRecording = async () => {
      console.log(this.state.id);
      const constraints = {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: this.state.id
          }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      videoElement.srcObject = stream;
      streamVideo(stream)
      this.setState({ rec: true })
    }


    const streamVideo = (stream) => {
      mediaRecorder = new MediaRecorder(stream, options)
      mediaRecorder.start()
      mediaRecorder.onpause = () => videoElement.pause();
      mediaRecorder.ondataavailable = (event) => recordedChunks.push(event.data)
      mediaRecorder.onstop = stopRecording;

      this.setState({ recState: 'active' })
      videoElement.play();

      ipcRenderer.on('pause', (e) => mediaRecorder.pause())
      ipcRenderer.on('stop', (e) => mediaRecorder.stop())
    }

    const stopRecording = async (e) => {
      videoElement.pause();
      const blob = new Blob(recordedChunks, { type: 'video/webm; codecs=vp9' })
      const buffer = Buffer.from(await blob.arrayBuffer())
      ipcRenderer.send('saveVideo', buffer)
      this.setState({ rec: false, recState: 'stopped' })
    }

    const pauseRecording = () => {
      this.setState({ rec: false, recState: 'paused' })
    }

    const changeDuration = (event) => this.setState({ duration: event.target.value })

    return (
      <div>
        <Header title="Recorder" />
        <video className="video"></video>
        <center>
          { this.state.recState === 'notbegun' ?
            <IconButton color="primary" onClick={startRecording}>
              <FiberManualRecordIcon />
          </IconButton>
          :
          <IconButton onClick={() => ipcRenderer.emit('stop')} color="primary">
          <StopIcon />
        </IconButton>
        }
        </center>
      </div>
    )
  }
}

export default Recorder;
