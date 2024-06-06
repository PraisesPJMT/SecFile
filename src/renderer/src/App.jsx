import { createBrowserRouter} from 'react-router-dom'

import Start from './screens/start/Start'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />
  }
])

export default router
