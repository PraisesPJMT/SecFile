import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

/**
 * An object containing bridge functions for interacting with the index.
 *
 * @namespace
 */
const indexBridge = {
  /**
   * Opens the repository.
   *
   * @return {Promise<void>} A promise that resolves when the repository is successfully opened.
   */
  openRepository: async () => await ipcRenderer.invoke('openRepository')
}

/**
 * An object containing bridge functions for crypto operations.
 *
 * @namespace
 */
const cryptoBridge = {
  /**
   * Encrypts a file using the provided passKey.
   *
   * @param {string} file - The path to the file to be encrypted.
   * @param {string} passKey - The passKey used to encrypt the file.
   * @return {Promise<void>} A promise that resolves when the file is successfully encrypted.
   */
  encryptFile: async (file, passKey) => {
    const args = { file, passKey }

    try {
      await ipcRenderer.invoke('encryptFile', args)
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * Decrypts a file using the provided passKey.
   *
   * @param {string} file - The path to the file to be decrypted.
   * @param {string} passKey - The passKey used to decrypt the file.
   * @return {Promise<void>} A promise that resolves when the file is successfully decrypted.
   */
  decryptFile: async (file, passKey) => {
    const args = { file, passKey }

    try {
      await ipcRenderer.invoke('decryptFile', args)
    } catch (error) {
      console.log(error)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('indexBridge', indexBridge)
    contextBridge.exposeInMainWorld('cryptoBridge', cryptoBridge)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
