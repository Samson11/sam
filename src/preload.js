const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')
const Store = require('secure-electron-store').default

let store = new Store()

contextBridge.exposeInMainWorld('api', { store: store.preloadBindings(ipcRenderer, fs) })
