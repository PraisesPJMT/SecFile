import { describe, it, expect } from 'vitest'
import { validateFile, validatePassword } from '../../utils/helpers'
import { MODE, MIN_PASSWORD_LENGTH } from '../../utils/constants'

describe('SecFile: Utils Tests', () => {
  describe('validateFile', () => {
    it('should return true for valid encryption file extensions', () => {
      const file = new File([''], 'example.txt', { type: 'text/plain' })
      expect(validateFile(file, MODE.ENCRYPT)).toBe(true)
    })

    it('should return true for valid decryption file extensions', () => {
      const file = new File([''], 'example.txt.enc', { type: 'text/plain' })
      expect(validateFile(file, MODE.DECRYPT)).toBe(true)
    })

    it('should return false for invalid file extensions', () => {
      const file = new File([''], 'example.pdf', { type: 'application/pdf' })
      expect(validateFile(file, MODE.ENCRYPT)).toBe(true)
      expect(validateFile(file, MODE.DECRYPT)).toBe(false)
    })

    it('should return false for invalid mode', () => {
      const file = new File([''], 'example.txt', { type: 'text/plain' })
      expect(validateFile(file, 'INVALID_MODE')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should return null for valid password', () => {
      expect(validatePassword('password123')).toBe(null)
    })

    it('should return error message for too short password', () => {
      expect(validatePassword('sho')).toBe(
        `Key must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      )
    })
  })
})
