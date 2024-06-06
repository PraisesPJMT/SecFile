import { createBrowserRouter } from 'react-router-dom'

import Start from './screens/start/Start'
import About from './screens/about/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />
  },
  {
    path: '/about',
    element: <About />
  }
])

export default router
