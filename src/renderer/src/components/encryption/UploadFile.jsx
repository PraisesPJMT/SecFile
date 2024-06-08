import { useState } from 'react'
import { validateFile } from '../../utils/helpers'

import File from '../svg/File'
import PropTypes from 'prop-types'
import FileUpload from '../svg/FileUpload'

/**
 * Renders a component for uploading a plain file.
 *
 * @param {Object} props - The component props.
 * @param {File} props.file - The uploaded file.
 * @param {string} props.title - The title of the component.
 * @param {Function} props.setData - A function to update the component state.
 * @return {JSX.Element} The rendered component.
 */
const UploadFile = ({ file, title, setData }) => {
  const [errorMessage, setErrorMessage] = useState()

  /**
   * Handles the file upload event.
   *
   * @param {Event} event - The file upload event.
   * @return {void} Sets the uploaded file in the component state and clears any error message.
   */
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const name = event.target.name
    if (!file) return

    if (!validateFile(file)) {
      setErrorMessage('Invalid file type!')
      setData((prev) => ({ ...prev, [name]: null }))
      return
    }

    setData((prev) => ({ ...prev, [name]: file }))
    setErrorMessage(null)
  }

  return (
    <>
      <div className="encrypt-header">
        <h6>{title}</h6>
      </div>

      <div className="encrypt-body">
        <label htmlFor="file" className="file">
          <File />
          {file && <p>{file.name}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}

          <input
            name="file"
            type="file"
            id="file"
            required={file ? false : true}
            onChange={handleFileUpload}
          />
          <span>
            <FileUpload />
            Upload File
          </span>
        </label>
      </div>
    </>
  )
}

UploadFile.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  }),
  title: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired
}

export default UploadFile
