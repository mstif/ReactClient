import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={loginHandler}>
                    <h3>Аутентификация</h3>
                    <p className="text-body-secondary">Войдите в свой аккаунт</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="Email"
                        id="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="Password"
                        id="password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Войти
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Забыли пароль?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h3>Регистрация</h3>
                    <p>
                      После регистрации необходимо отправить ваши данные администратору для
                      подтверждения роли в организации
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Зарегистрировать
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <div className="message"></div>
    </div>
  )
  async function loginHandler(e) {
    e.preventDefault()
    const form_ = e.target,
      submitter = document.querySelector('input.login')

    const formData = new FormData(form_, submitter),
      dataToSend = {}

    for (const [key, value] of formData) {
      dataToSend[key] = value
    }

    if (dataToSend.Remember === 'on') {
      dataToSend.Remember = true
    }

    console.log('login data before send: ', dataToSend)
    const response = await fetch('api/securewebsite/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(dataToSend),
      headers: {
        'content-type': 'Application/json',
        Accept: 'application/json',
      },
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('user', dataToSend.Email)
      document.location = '/'
    }

    const messageEl = document.querySelector('.message')
    if (data.message) {
      messageEl.innerHTML = data.message
    } else {
      messageEl.innerHTML = 'Something went wrong, please try again'
    }

    console.log('login error: ', data)
  }
}

export default Login
