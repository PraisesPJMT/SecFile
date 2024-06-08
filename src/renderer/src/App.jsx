import { createBrowserRouter } from 'react-router-dom'

import Start from './screens/start/Start'
import About from './screens/about/About'
import Encrypt from './screens/encrypt/Encrypt'

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
  }
])

export default router
