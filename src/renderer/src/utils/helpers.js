import { ACCEPTED_FILE_TYPES, MIN_PASSWORD_LENGTH } from './constants'

/**
 * Validates a file based on its extension.
 *
 * @param {File} file - The file to be validated.
 * @return {boolean} Returns true if the file extension is in the list of accepted file types, false otherwise.
 */
export const validateFile = (file) => {
  const fileExtension = file.name.split('.').pop().toLowerCase()
  return ACCEPTED_FILE_TYPES.includes(fileExtension)
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
