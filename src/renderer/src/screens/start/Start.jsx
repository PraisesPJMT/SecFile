import { Link } from 'react-router-dom'

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
              <span>SecFile</span> takes your files and adds <span>AES-256-GCM</span> encryption to
              it. With encryption, you know your file is incredibly secure and that only the right
              person can access it.
            </p>
          </div>
        </section>
        <section className="actions">
          <div className="screen">
            <Link to="/" className="secondary-btn">
              Decrypt File
            </Link>
            <Link to="/" className="primary-btn">
              Encrypt File
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default Start
