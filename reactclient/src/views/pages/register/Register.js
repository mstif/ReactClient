import React from 'react'
import { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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

const Register = () => {
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      document.location = '/'
    }
  }, [])
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm action="#" onSubmit={registerHandler}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" name="Name" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" name="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="PasswordHash"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="RepeatPasswordHash"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <div className="message"></div>
    </div>
  )

  async function registerHandler(e) {
    e.preventDefault()
    const form_ = e.target,
      submitter = document.querySelector('input.login')

    const formData = new FormData(form_, submitter),
      dataToSend = {}

    for (const [key, value] of formData) {
      dataToSend[key] = value
    }

    // create username
    const newUserName = dataToSend.Name.trim().split(' ')
    dataToSend.UserName = newUserName.join('')

    const response = await fetch('api/securewebsite/register', {
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
      document.location = '/login'
    }

    const messageEl = document.querySelector('.message')
    if (data.message) {
      messageEl.innerHTML = data.message
    } else {
      let errorMessages = "<div>Attention please:</div><div class='normal'>"
      data.errors.forEach((error) => {
        errorMessages += error.description + ' '
      })

      errorMessages += '</div>'
      messageEl.innerHTML = errorMessages
    }

    console.log('login error: ', data)
  }
}

export default Register
