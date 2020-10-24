const { app, BrowserWindow, ipcMain, dialog, Menu, Tray } = require('electron')

const path = require('path')
const url = require('url')
const { writeFile } = require('fs')
const Jimp = require('jimp');
let mainWindow
let toQuit = true

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 950,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: true,
      // preload: path.join(__dirname, 'preload.js'),
    },
    animated: true,
    frame: false
  })

  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../public/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', (e) => {
    e.preventDefault();
    if (toQuit) {
      mainWindow = null;
      app.exit();
    } else {
      // mainWindow.hide();
      toQuit = true;
    }
  })
}

app.whenReady().then(() => {
  const tray = new Tray('path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item 1', type: 'radio', click: () => console.log('Hi') },
    { label: 'Item 2', type: 'radio', checked: true }
  ])
  tray.setTooltip('This is my Application')
  tray.setContextMenu(contextMenu)
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('closed', () => mainWindow = null)

function createNewWindow(url, hide, frame) {
  const newWindow = new BrowserWindow({
    width: 950,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    },
    animated: true,
    frame: frame
  })
  newWindow.setMenuBarVisibility(hide)
  newWindow.loadURL(
    process.env.ELECTRON_START_URL + `/${url}` ||
    url.format({
      pathname: path.join(__dirname, '/../public/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  newWindow.once('ready-to-show', () => {
    newWindow.show()
    newWindow.focus()
    ipcMain.on('minimise', (e) => newWindow.minimize())
    ipcMain.on('hide', (e) => newWindow.hide())
  })

  newWindow.on('closed', () => {
    newWindow = null;
  })

}

/** Active Listeners */
ipcMain.on('createBrowserWindow', (e, url, hide) => {
  toQuit = false;
  createNewWindow(url, hide)
  mainWindow.hide()
})

ipcMain.on('close', (e) => app.quit())
ipcMain.on('saveVideo', async (e, buffer) => {
  const { filePath } = await dialog.showSaveDialog({ buttonLabel: 'Save Video', defaultPath: `S.A.M.vid-${Date.now()}.webm` })
  writeFile(filePath, buffer, () => console.log('Video Saved'))
})


/** Initiate Cropper **/
function discardSnip(e){
    this.setState({
        image : '',
        save_controls : false,
    });
    this.resizeWindowFor('main');
}

function saveToDisk(e){
    const directory = path.join(__dirname + '/snips');
    const filepath = path.join(directory + '/' + uuidv4() + '.png');
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    }
    fs.writeFile(filepath, this.state.image.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64', (err) => {
        if(err) console.log(err);
        shell.showItemInFolder(filepath);
        this.discardSnip(null);
    });
}

function uploadAndGetURL(e){
    post(this.state.upload_url, {
        image : this.state.image
    })
    .then((response) => {
        const res = response.data;
        if(res.uploaded){
            shell.openExternal(this.state.upload_url + '/' + res.filename);
            this.discardSnip(null);
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

function getScreenShot(callback, imageFormat) {
    let _this = this;
    this.callback = callback;
    imageFormat = imageFormat || 'image/png';

    this.handleStream = (stream) => {

        // Create a hidden video element on DOM
        let video_dom = document.createElement('video');

        // hide it somewhere
        video_dom.style.cssText = 'position:absolute;top:-10000px;left:-10000px;';

        // Load stream
        video_dom.onloadedmetadata = function () {

            // Set video ORIGINAL height (screenshot)
            video_dom.style.height = this.videoHeight + 'px'; // videoHeight
            video_dom.style.width = this.videoWidth + 'px'; // videoWidth

            // Create canvas
            let canvas = document.createElement('canvas');
            canvas.width = this.videoWidth;
            canvas.height = this.videoHeight;
            let ctx = canvas.getContext('2d');

            // Draw video on canvas
            ctx.drawImage(video_dom, 0, 0, canvas.width, canvas.height);

            if (_this.callback) {
                // Save screenshot to base64
                _this.callback(canvas.toDataURL(imageFormat));
            } else {
                console.log('Need callback!');
            }

            // Remove hidden video tag
            video_dom.remove();

            try {
                // Destroy connect to stream
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

function captureScreen(coordinates, e) {
  this.getScreenShot((base64data) => {

    let encondedImageBuffer = new Buffer(base64data.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');

    Jimp.read(encondedImageBuffer, (err, image) => {
      if (err) throw err;

      let crop = coordinates ?
        image.crop(coordinates.x, coordinates.y, parseInt(coordinates.width, 10), parseInt(coordinates.height, 10)) :
        image.crop(0, 0, screenSize.width, screenSize.height);

      crop.getBase64('image/png', (err, base64data) => {
        this.setState({
          image: base64data,
          save_controls: true,
        });
        this.resizeWindowFor('snip');
        mainWindow.show();
      });
    });

  });
}

function initCropper(width, height) {
  let snipWindow;
  snipWindow = new BrowserWindow({
    width,
    height,
    frame: false,
    transparent: true,
    kiosk: true
  });

  snipWindow.on('close', () => {
    snipWindow = null
  });

  ipcMain.once('snip', (event, data) => {
    captureScreen(data, null);
  });

  ipcMain.once('cancelled', (event) => {
    mainWindow.show();
  });

  snipWindow.loadURL(
    process.env.ELECTRON_START_URL + '/screenshot' ||
    url.format({
      pathname: path.join(__dirname, '/../public/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )
  snipWindow.setResizable(false);
}

ipcMain.on('cropper', (e, width, height) => initCropper(width, height))
ipcMain.on('hideMain', (e) => {
 ipcMain.emit('hide')
})
ipcMain.on('showMain', (e) => mainWindow.show())
