import { useState } from 'react'

/**
 * Custom hook for managing the encryption process.
 *
 * @param {Array<ReactNode>} steps - An array of steps for the encryption process.
 * @return {Object} - An object containing the current step, boolean flags for the first and last steps,
 * the current step's content, the array of steps, and functions for navigating to the next or previous step,
 * and resetting the process.
 */
const useEncryption = (steps) => {
  const [currentStep, setCurrentStep] = useState(0)

  /**
   * Increments the current step by 1 if it is less than the length of the steps array.
   *
   * @return {void}
   */
  const next = () => {
    setCurrentStep((prev) => {
      if (prev >= steps.length) return prev
      return prev + 1
    })
  }

  /**
   * Decrements the current step by 1 if it is greater than 0.
   *
   * @return {void}
   */
  const back = () => {
    setCurrentStep((prev) => {
      if (prev <= 0) return prev
      return prev - 1
    })
  }

  /**
   * Resets the current step to 0.
   *
   * @return {void} No return value.
   */

  const reset = () => setCurrentStep(0)

  return {
    currentStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    step: steps[currentStep],
    steps,
    next,
    back,
    reset
  }
}

export default useEncryption
