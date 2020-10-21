const { app, BrowserWindow, ipcMain, dialog } = require('electron')

const path = require('path')
const url = require('url')
const { writeFile } = require('fs')

let mainWindow
let toQuit = true

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
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
    if(toQuit){
      mainWindow = null;
      app.exit();
    } else {
      // mainWindow.hide();
      toQuit = true;
    }
  })
}

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

let newWindow;
function createNewWindow(url, hide, frame) {
  newWindow = new BrowserWindow({
    width: 800,
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
  })

  newWindow.on('closed', () => {
    newWindow = null;
  })

}

/** Active Listeners */
ipcMain.on('createBrowserWindow', (e, url, hide) => {
  toQuit = false;
  createNewWindow(url,hide)
  mainWindow.hide()
})

ipcMain.on('close', (e) => app.quit())
ipcMain.on('minimise', (e) => newWindow.minimize())
ipcMain.on('saveVideo', async (e, buffer) => {
  const { filePath } = await dialog.showSaveDialog({ buttonLabel: 'Save Video', defaultPath: `S.A.M.vid-${Date.now()}.webm` })
  writeFile(filePath, buffer, () => console.log('Video Saved'))
})
