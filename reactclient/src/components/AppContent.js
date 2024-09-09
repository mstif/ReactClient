import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import ProtectedRoutes from '../ProtectedRoutes'
const Login = React.lazy(() => import('../views/pages/login/Login'))
const Register = React.lazy(() => import('../views/pages/register/Register'))
const Page404 = React.lazy(() => import('../views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('../views/pages/page500/Page500'))
// routes config
import routes from '../routes'
const data = {}
const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element data={data} />}
                  />
                )
              )
            })}
            <Route path="/" element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
