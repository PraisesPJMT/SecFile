import { UAParser } from 'ua-parser-js'
import Header from '../../components/header/Header'
import Logo from '../../components/svg/Logo'

import './about.css'
import GitHub from '../../components/svg/GitHub'

const About = () => {
  const userAgent = navigator.userAgent
  const parser = new UAParser(userAgent)
  const os = parser.getOS()
  const device = parser.getDevice()

  return (
    <>
      <Header />
      <main>
        <section className="about screen">
          <h1>SecFile</h1>
          <br />
          <h5>
            Version 1.0.3 (Official build) || {os?.name} {os?.version} {device?.architecture}
          </h5>
          <hr />
          <div className="about-logo">
            <Logo />
          </div>
          <p>
            <span>SecFile</span> is a free, open-source, and cross-platform encryption tool that
            uses <span>AES-256-GCM</span> encryption to protect your files. Our mission is to
            provide a simple and secure way to safeguard your sensitive data.
          </p>
          <br />
          <p>
            <span>SecFile</span> is an open-source project, and we welcome contributions from
            developers and security enthusiasts alike. Whether you&apos;re a seasoned cryptographer
            or a curious coder, your contributions can help make <span>SecFile</span> even better.
          </p>
          <a
            href="https://github.com/PraisesPJMT/secfile/"
            className="tertiary-btn"
            target="_blank"
            rel="noreferrer"
          >
            <GitHub />
            Code Base
          </a>
        </section>
      </main>
    </>
  )
}

export default About
