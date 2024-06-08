import PropTypes from 'prop-types'
import FileShield from '../svg/FileShield'
import FileDownload from '../svg/FileDownload'

/**
 * Renders a component for saving an encrypted file.
 *
 * @param {Object} props - The component props.
 * @param {File} props.file - The encrypted file to save.
 * @param {boolean} props.saved - Indicates if the file has been saved.
 * @param {string} props.saveError - The error message if saving the file fails.
 * @param {Function} props.setData - A function to update the component state.
 * @return {JSX.Element} The rendered component.
 */
const SaveFile = ({ file, saved, saveError, setData }) => {
  /**
   * Saves the file with a custom name as a downloadable file.
   *
   * @return {void}
   */
  const handleSaveAs = () => {
    if (!file) return

    const blob = new Blob([file], { type: file.type })
    const fileURL = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = fileURL
    link.download = file.name
    link.click()
    setData((prev) => ({ ...prev, ['saved']: true }))
  }

  return (
    <>
      <div className="encrypt-header">
        <h6>Save Encrypted File</h6>
      </div>
      <div className="encrypt-body">
        <div htmlFor="enc-file" className="enc-file">
          <FileShield />

          <button type="button" onClick={handleSaveAs}>
            <FileDownload />
            Save File
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
    size: PropTypes.number.isRequired
  }).isRequired,
  saved: PropTypes.bool.isRequired,
  saveError: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired
}

export default SaveFile
