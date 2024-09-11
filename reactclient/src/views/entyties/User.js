import React from 'react'
import classNames from 'classnames'
import { useState, useEffect, Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CFormCheck,
  CFormSelect,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilCheckAlt,
  cilPencil,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const User = () => {
  const initItem = {
    userName: '',
    company: '',
    roles: [],
    majorRole: '',
    email: '',
    id: 'new',
    fullName: '',
    password: '',
    confirmPassword: '',
    approved: true,
    statusMessage: '',
  }
  const [item, setItem] = useState(initItem)
  const [isLoading, setLooding] = useState(false)
  const [isModified, setModified] = useState(false)
  const [role, setRole] = useState('')
  const currentRoles = localStorage.getItem('roles')
  const isAdmin = currentRoles.includes('Administrator')
  const params = useParams()
  const getApiData = async () => {
    const itemId = params.id
    const response = await fetch('/api/securewebsite/' + itemId, {
      method: 'GET',
      credentials: 'include',
    }).then((response) => response.json())

    setItem(response)
    setRole(response.majorRole)
  }

  useEffect(() => {
    getApiData()
  }, [])

  const saveData = async () => {
    if (isLoading) return
    item.majorRole = role
    let query = '/api/securewebsite/save-user-full'
    //if (item.id > 0) {
    //  query = '/api/Contragent/update'
    //}
    setLooding(true)
    const response = await fetch(query, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).then((response) => response.json())
    setItem(response)
    setModified(false)
    setLooding(false)
  }

  const handleChange = (e) => {
    setRole(e.target.value)
  }

  const handler = (e) => {
    const { target } = e
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    setItem((f) => ({ ...f, [name]: value }))
    setModified(true)
  }

  const cs = (val) => {
    if (val == null) return ''
    else return val
  }
  const cn = (val) => {
    if (val == null) return 0
    else return val
  }

  return (
    <>
      <CRow className="mb-3">
        <CCol sm={3}>Код</CCol>
        <CCol sm={9}>{item.id}</CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Логин</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            placeholder="Логин"
            value={cs(item.userName)}
            name="userName"
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Email</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            placeholder="Email"
            value={cs(item.email)}
            name="email"
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Полное имя</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            placeholder="Полное имя"
            value={cs(item.fullName)}
            name="fullName"
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Пароль</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            placeholder="Пароль"
            value={cs(item.password)}
            name="password"
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Подтверждение</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            placeholder="Подтверждение пароля"
            value={cs(item.confirmPassword)}
            name="confirmPassword"
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3" disabled>
        <CCol sm={3}>Роль</CCol>
        <CCol sm={3}>
          {isAdmin ? (
            <>
              <CFormCheck
                type="radio"
                id="Logist"
                value="Logist"
                name="Role"
                label="Логист"
                checked={role == 'Logist'}
                onChange={handleChange}
                disabled={!isAdmin}
              />
              <CFormCheck
                type="radio"
                id="Customer"
                value="Customer"
                label="Продавец"
                name="Role"
                checked={role == 'Customer'}
                onChange={handleChange}
                disabled={!isAdmin}
              />
              <CFormCheck
                type="radio"
                id="Administrator"
                value="Administrator"
                checked={role == 'Administrator'}
                name="Role"
                label="Администратор"
                onChange={handleChange}
                disabled={!isAdmin}
              />
            </>
          ) : (
            item.majorRole
          )}
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Компания</CCol>
        <CCol sm={9}>
          <CFormSelect
            aria-label="Default select example"
            options={[]}
            onChange={handler}
            name="allCompanies"
            value={''}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Статус</CCol>
        <CCol sm={9}>
          {isAdmin ? (
            <CFormCheck
              type="checkbox"
              id="isApproved"
              checked={item.approved}
              label="Активен"
              name="approved"
              onChange={handler}
              disabled={!isAdmin}
            />
          ) : item.approved ? (
            'Активен'
          ) : (
            'Отключен'
          )}
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>
          <CButton onClick={saveData} className="btn btn-primary">
            Сохранить
          </CButton>
        </CCol>
        <CCol sm={1}>
          {isLoading ? (
            <CSpinner color="primary" variant="grow" className={isLoading ? '' : 'd-none'} />
          ) : (
            <CIcon
              size="lg"
              className="text-success mt-2"
              icon={isModified ? cilPencil : cilCheckAlt}
            ></CIcon>
          )}
        </CCol>
        <CCol className="small" sm={8}>
          {item.statusMessage}
        </CCol>
      </CRow>
    </>
  )
}
export default User
