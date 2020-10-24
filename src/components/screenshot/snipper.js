import React, { Component, Fragment } from 'react';
import Cropper from './cropper';
import Button from '@material-ui/core/Button';
const { ipcRenderer, desktopCapturer } = window.require('electron');
const Jimp = window.require('jimp');

class Snipper extends Component{
  state = {
    image: ''
  }

  constructor(props){
    super(props);
  }

  captureScreen(coordinates, e) {
    ipcRenderer.send('hide')
    this.getScreenShot((base64data) => {
      let encondedImageBuffer = new Buffer(base64data.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');

      Jimp.read(encondedImageBuffer, (err, image) => {
        if (err) throw err;

        let crop = coordinates ?
          image.crop(coordinates.x, coordinates.y, parseInt(coordinates.width, 10), parseInt(coordinates.height, 10)) :
          image.crop(0, 0, window.screen.width, window.screen.height);

        crop.getBase64('image/png', (err, base64data) => {
          this.setState({
            image: base64data,
            save_controls: true,
          });
          // this.resizeWindowFor('snip');
          ipcRenderer.send('showMain')
        });
      });

    });
  }

  getScreenShot(callback, imageFormat) {
    let _this = this;
    this.callback = callback;
    imageFormat = imageFormat || 'image/png';
    this.handleStream = (stream) => {
      let video_dom = document.createElement('video');
      video_dom.style.cssText = 'position:absolute;top:-10000px;left:-10000px;';
      video_dom.onloadedmetadata = function () {

      video_dom.style.height = this.videoHeight + 'px'; // videoHeight
      video_dom.style.width = this.videoWidth + 'px'; // videoWidth

      let canvas = document.createElement('canvas');
      canvas.width = this.videoWidth;
      canvas.height = this.videoHeight;
      let ctx = canvas.getContext('2d');

      ctx.drawImage(video_dom, 0, 0, canvas.width, canvas.height);

      if (_this.callback) {
          _this.callback(canvas.toDataURL(imageFormat));
      } else {
          console.log('Need callback!');
      }

      video_dom.remove();

      try {
        stream.getTracks()[0].stop();
      } catch (e) {}
    };

    video_dom.src = URL.createObjectURL(stream);
    document.body.appendChild(video_dom);
    };

    this.handleError = (e) => {
      console.log(e);
    };

    // Get available screen
    desktopCapturer.getSources({types: ['screen']}, (error, sources) => {
        if (error) throw error;
        for (let i = 0; i < sources.length; ++i) {
            // Filter: main screen
            if (sources[i].name === "Entire screen") {
                navigator.webkitGetUserMedia({
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: sources[i].id,
                            minWidth: 1280,
                            maxWidth: 4000,
                            minHeight: 720,
                            maxHeight: 4000
                        }
                    }
                }, this.handleStream, this.handleError); // handle stream

                return;
            }
        }
    });
  }


    render(){
        return(
          <div>
          <div>
              <Button onClick={this.captureScreen.bind(this, null)}>Fullscreen</Button>

              <Button onClick={() => ipcRenderer.send('cropper', window.screen.width, window.screen.height)}>Crop Image</Button>
          </div>

          <div>
              <button
                  className="btn btn-primary mr-1">
                  Save to Disk
              </button>

              <button
                  className="btn btn-primary mr-1">
                  Upload URL
              </button>

              <button
                  className="btn btn-primary mr-1">
                  Discard
              </button>

          </div>
          <div className="snipped-image">
              <img  className="preview" src={this.state.image} alt=""/>
          </div>
          <Cropper snip={this.snip.bind(this)} destroySnipView={this.destroySnipView.bind(this)} />
          </div>
        )
    }
}

export default Snipper;
