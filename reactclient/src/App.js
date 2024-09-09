import React, { Suspense, useEffect } from 'react'
import {
  HashRouter,
  Route,
  Routes,
  Navigate,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './ProtectedRoutes'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import routes from '../src/routes'
import Contragent from './views/entyties/Contragent'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const OpenMap1 = React.lazy(() => import('./map/OpenMap'))

const dataPoints = '{}'
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const points = 'begin'
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        {/*<DefaultLayout />*/}
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="*" element={<DefaultLayout />} />
            <Route path="/buttons/buttons" element={<Buttons />} />

            {/* <Route path="/contragent/:id" element={<Contragent />} />*/}
          </Route>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />

          {/*<Route path="*" name="Home" element={<DefaultLayout />} />*/}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
