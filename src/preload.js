const { contextBridge } = require('electron')

function getD() {
  return new Promise((resolve, reject) => {
    if(window.localStorage.length) {
      resolve(window.localStorage.length)
    }else {
      reject('Not found')
    }
  })
}

contextBridge.exposeInMainWorld('sam', {
  log: (key, value) => console.log(key, value)
})
