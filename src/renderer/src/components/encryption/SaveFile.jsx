import { MODE } from '../../utils/constants'

import PropTypes from 'prop-types'
import useUtil from '../../hook/useUtil'
import FileShield from '../svg/FileShield'
import FileDownload from '../svg/FileDownload'

/**
 * Renders a component for saving an encrypted file.
 *
 * @param {Object} props - The component props.
 * @param {File} props.file - The encrypted file to save.
 * @param {string} props.title - The title of the component.
 * @param {string} props.fileKey - The encryption key to use for encryption.
 * @param {string} props.mode - The encryption mode.
 * @param {boolean} props.saved - Indicates if the file has been saved.
 * @param {boolean} props.encryptedFile - Indicates if the file is encrypted.
 * @param {string} props.saveError - The error message if saving the file fails.
 * @param {Function} props.setData - A function to update the component state.
 * @return {JSX.Element} The rendered component.
 */
const SaveFile = ({ saved, file, fileKey, title, saveError, setData, mode }) => {
  const { encryptFile, decryptFile } = useUtil()

  /**
   * Saves the file with a custom name as a downloadable file.
   *
   * @return {void}
   */
  const handleSaveAs = () => {
    if (mode === MODE.ENCRYPT) encryptFile(file.path, fileKey)

    if (mode === MODE.DECRYPT) decryptFile(file.path, fileKey)

    setData((prev) => ({ ...prev, ['saved']: true }))
  }

  return (
    <>
      <div className="encrypt-header">
        <h6>{title}</h6>
      </div>
      <div className="encrypt-body">
        <div htmlFor="enc-file" className="enc-file">
          <FileShield />

          <button className={saved ? 'saved' : ''} type="button" onClick={handleSaveAs}>
            <FileDownload />
            {saved ? 'Saved' : 'Save File'}
          </button>
        </div>
        {!saved && saveError && <p className="error">{saveError}</p>}
      </div>
    </>
  )
}

SaveFile.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired
  }),
  fileKey: PropTypes.string.isRequired,
  saved: PropTypes.bool.isRequired,
  saveError: PropTypes.string,
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  encryptedFile: PropTypes.string,
  setData: PropTypes.func.isRequired
}

export default SaveFile
