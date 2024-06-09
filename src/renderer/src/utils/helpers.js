import {
  ACCEPTED_DECRYPTION_FILE_TYPES,
  ACCEPTED_ENCRYPTION_FILE_TYPES,
  MIN_PASSWORD_LENGTH,
  MODE
} from './constants'

/**
 * Validates a file based on the specified mode.
 *
 * @param {File} file - The file to be validated.
 * @param {string} mode - The mode of validation (ENCRYPT or DECRYPT).
 * @return {boolean} Returns true if the file extension is valid for the specified mode, otherwise false.
 */
export const validateFile = (file, mode) => {
  const fileExtension = file.name.split('.').pop().toLowerCase()

  if (mode === MODE.ENCRYPT) return ACCEPTED_ENCRYPTION_FILE_TYPES.includes(fileExtension)

  if (mode === MODE.DECRYPT) return ACCEPTED_DECRYPTION_FILE_TYPES.includes(fileExtension)

  return false
}

/**
 * Validates a password by checking its length.
 *
 * @param {string} password - The password to be validated.
 * @return {string|null} Returns an error message if the password is too short, or null if the password is valid.
 */
export const validatePassword = (password) => {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Key must be at least ${MIN_PASSWORD_LENGTH} characters long.`
  }

  return null
}
