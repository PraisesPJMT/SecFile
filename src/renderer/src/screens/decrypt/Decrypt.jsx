import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DATA, MODE } from '../../utils/constants'
import { validatePassword } from '../../utils/helpers'

import Logo from '../../components/svg/Logo'
import Tick from '../../components/svg/Tick'
import Arrow from '../../components/svg/Arrow'
import Header from '../../components/header/Header'
import Password from '../../components/svg/Password'
import useEncryption from '../../hook/useEncryption'
import Finish from '../../components/encryption/Finish'
import FileUpload from '../../components/svg/FileUpload'
import SaveFile from '../../components/encryption/SaveFile'
import FileDownload from '../../components/svg/FileDownload'
import InsertKey from '../../components/encryption/InsertKey'
import UploadFile from '../../components/encryption/UploadFile'

import './decrypt.css'

/**
 * Renders the Decrypt component, which allows users to decrypt a file by uploading an encrypted file,
 * providing a decryption key, and saving the decrypted file.
 *
 * @return {JSX.Element} The Decrypt component.
 */
const Decrypt = () => {
  const [data, setData] = useState(DATA)

  const navigate = useNavigate()

  const { step, next, back, reset, currentStep, isFirstStep, isLastStep } = useEncryption([
    <UploadFile
      key={0}
      {...data}
      setData={setData}
      title="Upload Encrypted File"
      mode={MODE.DECRYPT}
    />,
    <InsertKey key={1} {...data} setData={setData} title="Provide Decryption Key" />,
    <SaveFile
      key={2}
      {...data}
      setData={setData}
      title="Save Decrypted File"
      mode={MODE.DECRYPT}
    />,
    <Finish key={3} title="Finish Decryption" />
  ])

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   * @return {void}
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (currentStep === 1) {
      if (validatePassword(data.fileKey)) {
        setData((prev) => ({ ...prev, keyError: validatePassword(data.fileKey) }))
        return
      } else {
        setData((prev) => ({
          ...prev,
          saveError: null,
          encrytedFile: true
        }))
        return next()
      }
    }

    if (currentStep === 2) {
      if (!data.saved) {
        setData((prev) => ({ ...prev, saveError: 'Please save the encrypted file first' }))
        return
      }

      setData((prev) => ({ ...prev, saveError: null }))
      return next()
    }
    if (isLastStep) {
      setData(DATA)
      navigate('/')
      return reset()
    }
    return next()
  }

  return (
    <>
      <Header />
      <main className="encrypt">
        <section className="headline">
          <div className="screen">
            <h1>
              <Logo />
              SecFile
            </h1>
            <h2>DECRYPT FILE</h2>
          </div>
          <div className="encrypt-cover">
            <form onSubmit={handleSubmit} className="encrypt-box">
              <div className="encrypt-progress">
                <div className="item">
                  <FileUpload />
                  <span>Upload File</span>
                  <span className={`progress ${currentStep === 0 && 'active'}`}>
                    {data.file && <Tick />}
                  </span>
                </div>

                <div className="item">
                  <Password />
                  <span>Decryption Key</span>
                  <span className={`progress ${currentStep === 1 && 'active'}`}>
                    {data.file && data.fileKey.length > 0 && <Tick />}
                  </span>
                </div>

                <div className="item">
                  <FileDownload />
                  <span>Save Decrypted File</span>
                  <span className={`progress ${currentStep === 2 && 'active'}`}>
                    {data.file && data.fileKey.length > 0 && data.saved && <Tick />}
                  </span>
                </div>
              </div>
              <div className="encrypt-details">
                {step}
                <div className="encrypt-footer">
                  {!isFirstStep && (
                    <button className="secondary-btn back" type="button" onClick={back}>
                      <Arrow />
                      Back
                    </button>
                  )}

                  <button className={`primary-btn next ${isFirstStep && 'only'}`} type="submit">
                    {isLastStep ? 'Finish' : 'Next'}
                    <Arrow />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default Decrypt
