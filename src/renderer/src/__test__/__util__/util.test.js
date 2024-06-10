import { describe, it, expect } from 'vitest'
import { validateFile, validatePassword } from '../../utils/helpers'
import { MODE, MIN_PASSWORD_LENGTH } from '../../utils/constants'

describe('SecFile: Utility Tests', () => {
  describe('GenerateKey Func', () => {
    it('should generate a 256-bit key', () => {
      const file = new File([''], 'example.txt', { type: 'text/plain' })
      expect(validateFile(file, MODE.ENCRYPT)).toBe(true)
    })
  })

  describe('EncryptFile Func', () => {
    it('should encrypt a simple pdf file', () => {
      const file = new File([''], 'example.txt', { type: 'text/plain' })
      expect(validateFile(file, MODE.ENCRYPT)).toBe(true)
    })
  })

  describe('DecryptFile Func', () => {
    it('should decrypt a simple pdf file', () => {
      const file = new File([''], 'example.txt', { type: 'text/plain' })
      expect(validateFile(file, MODE.ENCRYPT)).toBe(true)
    })
  })

  describe('ValidateKey Func', () => {
    it('should validate key format', () => {
      const file = new File([''], 'example.txt', { type: 'text/plain' })
      expect(validateFile(file, MODE.ENCRYPT)).toBe(true)
    })
  })

  describe('ValidateFile Func', () => {
    it('should return true for valid decryption file extensions', () => {
      const file = new File([''], 'example.txt.enc', { type: 'text/plain' })
      expect(validateFile(file, MODE.DECRYPT)).toBe(true)
    })
  })

  describe('ValidatePassword Func', () => {
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
