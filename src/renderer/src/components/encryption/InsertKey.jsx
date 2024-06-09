import { useState } from 'react'
import Key from '../svg/Key'
import Hide from '../svg/Hide'
import Show from '../svg/Show'
import PropTypes from 'prop-types'
import { validatePassword } from '../../utils/helpers'

/**
 * Renders a component for inserting a key.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.fileKey - The current file key.
 * @param {string} props.title - The title of the component.
 * @param {string|null} props.keyError - The error message for the key.
 * @param {Function} props.setData - The function to update the data state.
 * @return {JSX.Element} The rendered component.
 */
const InsertKey = ({ fileKey, title, keyError, setData }) => {
  const [showPassword, setShowPassword] = useState(false)

  /**
   * Updates the data state with the new value of the input field and clears the keyError.
   *
   * @param {Event} event - The event object triggered by the input field change.
   * @return {void} This function does not return a value.
   */
  const handlePasswordChange = (event) => {
    const { name, value } = event.target
    setData((prev) => ({ ...prev, [name]: value, ['keyError']: null }))
  }

  /**
   * Toggles the value of `showPassword` state.
   *
   * @return {void} This function does not return a value.
   */
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <div className="encrypt-header">
        <h6>{title}</h6>
      </div>

      <div className="encrypt-body">
        <label htmlFor="password" className="password">
          <Key />

          <span className="wrap">
            <input
              name="fileKey"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={fileKey}
              min={4}
              onChange={handlePasswordChange}
              required
              className={!validatePassword(fileKey) ? 'pass' : ''}
            />
            <button
              className={!validatePassword(fileKey) ? 'pass' : ''}
              type="button"
              onClick={handleToggleShowPassword}
              aria-label="Show Password"
            >
              {showPassword ? <Hide /> : <Show />}
            </button>
          </span>
        </label>
        {keyError && <p className="error">{keyError}</p>}
      </div>
    </>
  )
}

InsertKey.propTypes = {
  fileKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  keyError: PropTypes.string,
  setData: PropTypes.func.isRequired
}

export default InsertKey
