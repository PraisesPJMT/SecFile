import { useState } from 'react'
import Logo from '../svg/Logo'
import Menu from '../svg/Menu'
import Close from '../svg/Close'

import './header.css'
import { Link, NavLink } from 'react-router-dom'

/**
 * Renders the header component.
 *
 * @return {JSX.Element} The header component.
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Toggles the value of `isOpen` by negating its current value.
   *
   * @return {void} This function does not return a value.
   */
  const handleClick = () => setIsOpen(!isOpen)

  /**
   * Turns the value of `isOpen` to false and closes the menu.
   *
   * @return {void} This function does not return a value.
   */
  const closeMenu = () => setIsOpen(false)

  return (
    <header>
      <Link to="/" className="logo">
        <Logo />
        <span>StartOver</span>
      </Link>

      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li className="start">
            <NavLink to="/" onClick={closeMenu}>
              <span className="menu-logo">
                <Logo />
              </span>
              <span>Start Over</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Encrypt File
            </NavLink>
          </li>

          <li>
            <NavLink to="/" onClick={closeMenu}>
              Decrypt File
            </NavLink>
          </li>

          <li>
            <NavLink to="/" onClick={closeMenu}>
              Manage Keys
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" onClick={closeMenu}>
              About App
            </NavLink>
          </li>
        </ul>
      </nav>

      <button
        className={`menu-button ${isOpen ? 'open' : 'close'}`}
        aria-label="Open Menu"
        aria-expanded={isOpen}
        aria-controls="menu"
        type="button"
        onClick={handleClick}
      >
        {isOpen ? <Close /> : <Menu />}

        <span className="text" title="MENU"></span>
      </button>
    </header>
  )
}

export default Header
