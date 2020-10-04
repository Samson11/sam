const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const url = require('url')
const Store = require('secure-electron-store').default
const fs = require('fs')

let mainWindow
let toQuit = true

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      additionalArguments: [`storePath: ${app.getPath("userData")}`]
    },
    animated: true
  })

  const store = new Store({ path: app.getPath('userData') })
  store.mainBindings(ipcMain,mainWindow,fs)
  
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
  } else {
    store.clearMainBindings(ipcMain)
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('closed', () => mainWindow = null)

let newWindow
function createNewWindow(url, hide) {
  newWindow = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    },
    animated: true
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

ipcMain.on('createBrowserWindow', (e, url, hide) => {
  toQuit = false;
  createNewWindow(url,hide)
  mainWindow.hide()
})
