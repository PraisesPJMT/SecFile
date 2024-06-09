/**
 * Represents the DATA object.
 *
 * @typedef {Object} DATA
 * @property {null|string} file - The path of the file.
 * @property {string} fileKey - The key used to encrypt the file.
 * @property {null|Error} keyError - The error related to the key.
 * @property {null|Error} saveError - The error related to saving the file.
 * @property {null|string} encrytedFile - The path of the encrypted file.
 * @property {boolean} saved - Indicates whether the file is saved or not.
 */

/**
 * Exports the DATA object.
 *
 * @type {DATA}
 */
export const DATA = {
  file: null,
  fileKey: '',
  keyError: null,
  saveError: null,
  encrytedFile: null,
  saved: false
}
/**
 * Represents the accepted encryption file types.
 *
 * @type {string[]}
 */
export const ACCEPTED_ENCRYPTION_FILE_TYPES = ['docx', 'pdf', 'txt', 'ppt', 'xlsx']

/**
 * Represents the accepted decryption file types.
 *
 * @type {string[]}
 */
export const ACCEPTED_DECRYPTION_FILE_TYPES = ['enc']

/**
 * Represents the mode of operation.
 *
 * @typedef {Object} MODE
 * @property {string} ENCRYPT - The encryption mode.
 * @property {string} DECRYPT - The decryption mode.
 */

/**
 * Exports the MODE object.
 *
 * @type {MODE}
 */
export const MODE = {
  ENCRYPT: 'ENCRYPT',
  DECRYPT: 'DECRYPT'
}

/**
 * Represents the minimum password length.
 *
 * @type {number}
 */
export const MIN_PASSWORD_LENGTH = 4