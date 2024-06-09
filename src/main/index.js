import { join } from 'path'
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { scryptSync, createCipheriv, createDecipheriv } from 'crypto'

import fs from 'fs'
import icon from '../../resources/icon.png?asset'

/**
 * Creates a new browser window and sets up event listeners and window configurations.
 *
 * @return {void}
 */
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  // ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
let algorithm = 'aes-192-cbc'
let iv = Buffer.alloc(16, 0)

/**
 * Generates a cryptographic key using the scrypt algorithm.
 *
 * @param {string} passKey - The password used to generate the key.
 * @return {Buffer} The generated cryptographic key.
 */
const generateKey = (passKey) => scryptSync(passKey, 'salt', 24)

/**
 * Removes the encryption extension from a file name if it exists.
 *
 * @param {string} fileName - The file name to remove the extension from.
 * @return {string} The file name without the encryption extension, or the original file name if no extension is present.
 */
const removeEncryptionExtension = (fileName) => {
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex !== -1) {
    const extension = fileName.slice(lastDotIndex)
    if (extension === '.enc') {
      return fileName.slice(0, lastDotIndex)
    }
  }
  return fileName
}

/**
 * Adds the '.enc' extension to the given file name.
 *
 * @param {string} fileName - The file name to add the extension to.
 * @return {string} The file name with the '.enc' extension.
 */
const addEncryptionExtension = (fileName) => {
  return fileName + '.enc'
}

/**
 * Opens the repository URL in the default web browser.
 *
 * @return {Promise<void>} A promise that resolves when the repository URL is opened.
 */
ipcMain.handle('openRepository', () => {
  shell.openExternal('https://github.com/PraisesPJMT/SecFile/')
})

/**
 * Encrypts a file using the provided passKey.
 *
 * @param {Event} event - The IPC event object.
 * @param {Object} args - The arguments object containing the file and passKey.
 * @param {string} args.file - The path of the file to be encrypted.
 * @param {string} args.passKey - The passKey used to encrypt the file.
 * @return {Promise<void>} A promise that resolves when the file is encrypted.
 */
ipcMain.handle('encryptFile', (event, args) => {
  const { file, passKey } = args

  let key = generateKey(passKey)

  let encryptedFile

  let output = addEncryptionExtension(file)

  const inputFileStream = fs.ReadStream(file)
  const outputFileStream = fs.createWriteStream(output)

  const cypher = createCipheriv(algorithm, key, iv)

  inputFileStream.on('data', (data) => {
    encryptedFile = cypher.update(data)
    outputFileStream.write(encryptedFile)
  })

  inputFileStream.on('end', () => {
    outputFileStream.end()
  })
})

/**
 * Decrypts a file using the provided passKey.
 *
 * @param {Event} event - The IPC event object.
 * @param {Object} args - The arguments object containing the file and passKey.
 * @param {string} args.file - The path of the file to be decrypted.
 * @param {string} args.passKey - The passKey used to decrypt the file.
 * @return {Promise<void>} A promise that resolves when the file is decrypted.
 */
ipcMain.handle('decryptFile', (event, args) => {
  const { file, passKey } = args

  let key = generateKey(passKey)

  let decryptedFile

  let output = removeEncryptionExtension(file)

  const inputFileStream = fs.ReadStream(file)
  const outputFileStream = fs.createWriteStream(output)

  const decipher = createDecipheriv(algorithm, key, iv)

  inputFileStream.on('data', (data) => {
    decryptedFile = decipher.update(data)
    outputFileStream.write(decryptedFile)
  })

  inputFileStream.on('end', () => {
    outputFileStream.end()
  })
})
