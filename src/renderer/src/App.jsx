import { createBrowserRouter } from 'react-router-dom'

import Start from './screens/start/Start'
import About from './screens/about/About'
import Encrypt from './screens/encrypt/Encrypt'
import Decrypt from './screens/decrypt/Decrypt'

/**
 * The router object for defining the routes of the application.
 *
 * @type {Object}
 * @property {Object} path - The path of the route.
 * @property {React.Element} element - The component to render for the route.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/encrypt',
    element: <Encrypt />
  },
  {
    path: '/decrypt',
    element: <Decrypt />
  }
])

export default router
