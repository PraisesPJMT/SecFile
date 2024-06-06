import Logo from '../../components/svg/Logo'
import Header from '../../components/header/Header'

import './start.css'

/**
 * Renders the Start component.
 *
 * @return {JSX.Element} The rendered Start component.
 */
const Start = () => {
  return (
    <>
      <Header />
      <main>
        <section className="headline">
          <div className="screen">
            <h1>
              <Logo />
              SecFile
            </h1>
            <h2>
              Secure Files.
              <br />
              Protect Files.
            </h2>

            <p>
              SecFile takes your files and adds AES-256-GCM encryption to it. With encryption, you
              know your file is incredibly secure and that only the right person can access it.
            </p>
          </div>
        </section>
        <section className="actions">
          <div className="screen">
            <a href="#" className="secondary-btn">
              Decrypt File
            </a>
            <a href="#" className="primary-btn">
              Encrypt File
            </a>
          </div>
        </section>
      </main>
    </>
  )
}

export default Start
