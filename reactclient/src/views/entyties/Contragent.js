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

const Contragent = () => {
  const initItem = {
    address: '',
    clientCompany: false,
    comment: '',
    country: 1,
    deliveryPoint: false,
    logisticCompany: false,
    id: 0,
    inn: '',
    isAlive: true,
    latitude: '',
    longitude: '',
    name: '',
  }
  const [item, setItem] = useState(initItem)
  const [isLoading, setLooding] = useState(false)
  const [isModified, setModified] = useState(false)
  const params = useParams()
  const getApiData = async () => {
    const itemId = params.id
    const response = await fetch('/api/Contragent/' + itemId, {
      method: 'GET',
      credentials: 'include',
    }).then((response) => response.json())

    setItem(response)
  }

  useEffect(() => {
    getApiData()
  }, [])

  const saveData = async () => {
    let query = '/api/Contragent/create'
    if (item.id > 0) {
      query = '/api/Contragent/update'
    }
    setLooding(true)
    const response = await fetch(query, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).then((response) => response.json())
    setLooding(false)
    setItem(response)
    setModified(false)
  }

  const countries = () => {
    if (item.allCountries != undefined) {
      return item.allCountries.map((c, index) => {
        return { label: c, value: c }
      })
    } else return []
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
        <CCol sm={3}>Наименование</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            placeholder="Наименование"
            value={cs(item.name)}
            name="name"
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>ИНН</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            placeholder="ИНН"
            value={cs(item.inn)}
            name="inn"
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Тип компании</CCol>
        <CCol sm={3}>
          <CFormCheck
            id="islogist"
            checked={item.logisticCompany}
            name="logisticCompany"
            label="Логистическая компания"
            onChange={handler}
          />
          <CFormCheck
            id="isseller"
            checked={item.clientCompany}
            label="Продавец"
            name="clientCompany"
            onChange={handler}
          />
          <CFormCheck
            id="ispointlogist"
            checked={item.deliveryPoint}
            name="deliveryPoint"
            label="Точка доставки"
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Страна</CCol>
        <CCol sm={9}>
          <CFormSelect
            aria-label="Default select example"
            options={countries()}
            onChange={handler}
            name="country"
            value={item.country}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Адрес</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            placeholder=""
            value={cs(item.address)}
            name="address"
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Координаты</CCol>
        <CCol>
          <CFormInput
            type="text"
            placeholder="Широта"
            value={cs(item.latitude)}
            name="latitude"
            onChange={handler}
          />
        </CCol>
        <CCol>
          <CFormInput
            type="text"
            placeholder="Долгота"
            value={cs(item.longitude)}
            name="longitude"
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Комментарий</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            name="comment"
            placeholder="Комментарий"
            value={cs(item.comment)}
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={2}>
          <CButton onClick={saveData} className="btn btn-primary">
            Сохранить
          </CButton>
        </CCol>
        <CCol sm={1}>
          <CIcon
            size="lg"
            className="text-success mt-2"
            icon={isModified ? cilPencil : cilCheckAlt}
          ></CIcon>
        </CCol>
        <CCol sm={1}>
          <CSpinner color="primary" variant="grow" className={isLoading ? '' : 'd-none'} />
        </CCol>
      </CRow>
    </>
  )
}
export default Contragent
