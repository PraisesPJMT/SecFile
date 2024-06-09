/**
 * Returns an object with utility functions for interacting with the repository and encrypting/decrypting files.
 *
 * @return {Object} An object with the following properties:
 *   - openRepository: A function that opens the repository.
 *   - encryptFile: An asynchronous function that encrypts a file with a given passKey.
 *   - decryptFile: An asynchronous function that decrypts a file with a given passKey.
 */
const useUtil = () => {
  /**
   * Opens the repository by invoking the `openRepository` method on the `indexBridge` object in the `window` object.
   *
   * @return {void} This function does not return a value.
   */
  const openRepository = () => window.indexBridge.openRepository()

  /**
   * Asynchronously encrypts a file with the given passKey.
   *
   * @param {File} file - The file to be encrypted.
   * @param {string} passKey - The passKey used to encrypt the file.
   * @return {Promise<void>} A Promise that resolves when the file is successfully encrypted.
   */
  const encryptFile = async (file, passKey) => await window.cryptoBridge.encryptFile(file, passKey)

  /**
   * Asynchronously decrypts a file with the given passKey.
   *
   * @param {File} file - The file to be decrypted.
   * @param {string} passKey - The passKey used to decrypt the file.
   * @return {Promise<void>} A Promise that resolves when the file is successfully decrypted.
   */
  const decryptFile = async (file, passKey) => await window.cryptoBridge.decryptFile(file, passKey)

  return {
    openRepository,
    encryptFile,
    decryptFile
  }
}

export default useUtil
