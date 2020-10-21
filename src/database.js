const db = window.require('electron-db')

/**
** S.A.M. Local Database Module
*/

/**
** Get data based on a particular query/key
*/
export const getData = (key) => {
  return new Promise((resolve, reject) => db.getAll(key, (succ, data) => succ ? resolve(data) : reject(data)))
}

/**
** Add data to a specific key
*/
export const addData = (key, value) => {
  return new Promise((resolve, reject) => db.insertTableContent(key, value, (succ, msg) => succ ? resolve(value) : reject(msg)))
}

/**
** Add a table to a specific key
*/
export const addTable = (key) => {
  return new Promise((resolve, reject) => db.createTable(key, (succ, msg) => succ ? resolve(succ) : reject(msg)))
}

// Check if Database key is valid
export const verifyValidation = (key) => {
    return new Promise((resolve, reject) => db.valid(key) ? resolve(db.valid(key)): reject(db.valid(key)))
}

// Clear a table
export const clearTable = (key) => {
  return new Promise((resolve, reject) => db.clearTable(key, (succ, msg) => succ ? resolve(msg): reject(msg)))
}

// Update row
export const updateRow = (key, where, set) => {
  return new Promise((resolve, reject) => db.updateRow(key, where, set, (succ,msg) => succ ? resolve(msg) : reject(msg)))
}

// Seach Records
export const search = (key, field, data) => {
  return new Promise((resolve, reject) => db.search(key, field, data, (succ, data) => succ ? resolve(data) : reject(data)))
}

// Delete Record
export const deleteRecord = (key, id) => {
  return new Promise((resolve, reject) => db.deleteRow(key, { 'id': id }, (succ, msg) => succ ? resolve(msg): reject(msg)))
}

// Get data for specific Field
 export const fieldData = (key, field) => {
   return new Promise((resolve, reject) => db.getField(key, field, (succ,data) => succ ? resolve(data): reject(data)))
 }

// Clear all Records
export const clearRecord = (key) => {
  return new Promise((resolve, reject) => db.clearTable(key, (succ, msg) => succ ? resolve(msg) : reject(msg)))
}

// Count Records
export const countRecords = (key) => {
  return new Promise((resolve, reject) => db.count(key, (succ, data) => succ ? resolve(data) : reject(data)))
}

// Custom Check and Add Data
export const aio = (key, value) => {
  getData(key)
  .then(() => addData(key, value))
  .catch(async (err) => {
    await addTable(key)
    await addData(key, value)
  })
}
