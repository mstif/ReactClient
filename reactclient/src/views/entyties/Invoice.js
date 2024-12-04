import React from 'react'
import classNames from 'classnames'
import { useState, useEffect, Suspense } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale/ru'
registerLocale('ru', ru)
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
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
  cilLocationPin,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Invoice = () => {
  const initItem = {
    address: '',
    title: '',
    number: '',
    date: '',
    deliveryPoint: {},
    totalCost: 0,
    id: 0,
    weight: 0,
    isAlive: true,
    latitude: '',
    longitude: '',
    name: '',
    availableActions: [{ id: '', title: '' }],
  }
  const [item, setItem] = useState(initItem)
  const [isLoading, setLooding] = useState(false)
  const [isModified, setModified] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [departDate, setDepartDate] = useState(new Date())
  const [optionsC, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const roles = localStorage.getItem('roles')
  const isLogist = roles.includes('Logist')
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const getApiData = async (id, orderId) => {
    const itemId = id
    var query = 'api/Invoice/edit-invoice?id=' + itemId
    if (itemId == 0) {
      query = 'api/Invoice/create-invoice'
    }
    const response = await fetch(query, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((res) => {
        setOptions([{ value: res.deliveryPoint?.id, label: res.deliveryPoint?.title }])
        setSelectedOption({
          value: res.deliveryPoint?.id,
          label: res.deliveryPoint?.title,
        })
        setItem(res)
        if (res.orderId == null) {
          setItem((f) => ({ ...f, ['orderId']: orderId }))
        }
        setStartDate(new Date(res.date))
        setDepartDate(res.dateDeliveryFrom != null ? new Date(res.dateDeliveryFrom) : null)
      })
  }

  useEffect(() => {
    getApiData(params.id, searchParams.get('orderId'))
  }, [])

  const close = () => {
    navigate('/order/' + item.orderId)
  }

  const saveData = async () => {
    if (isLoading) return
    if (item.deliveryPoint == null) {
      alert('Не введен получатель!')
      return
    }
    let query = '/api/Invoice/save-invoice'
    setLooding(true)
    const response = await fetch(query, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).then((response) => {
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        setLooding(false)
        setModified(true)
        alert(message)
        return
      }
      return response.json()
    })
    //setItem(response)
    await getApiData(response.id)
    setModified(false)

    setLooding(false)
  }

  const handler = (e, typeInput) => {
    const { target } = e
    const value = target.type === 'checkbox' ? target.checked : target.value
    const typedValue = typeInput == 'dec' && value.length ? parseFloat(value) : value
    const { name } = target
    setItem((f) => ({ ...f, [name]: typedValue }))
    setModified(true)
  }

  const handleChange = (e) => {
    setRole(e.target.value)
  }
  const handleCompany = (e) => {
    setSelectedOption(e)
    setItem((f) => ({
      ...f,
      ['deliveryPoint']: { ['id']: e.value, ['title']: e.label },
      ['deliveryPointId']: e.value,
    }))
    setModified(true)
  }
  const handleDateDoc = (e) => {
    setStartDate(e)
    setItem((f) => ({ ...f, ['date']: e }))
    setModified(true)
  }
  const handleDateDep = (e) => {
    setDepartDate(e)
    setItem((f) => ({ ...f, ['dateDeliveryFrom']: e }))
    setModified(true)
  }

  const handleInput = (e) => {
    if (e.length >= 3) {
      var query =
        '/api/Contragent/list-contragents?Name=' + e + '&IsAlive=true&NotActiveFilter=false'
      const response = fetch(query, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((commits) => fill(commits))
    }
  }
  function fill(commits) {
    var t = commits.map((f) => ({ ['value']: f.id, ['label']: f.name }))
    setOptions(t)
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
        <CCol sm={3}>Дата</CCol>
        <CCol sm={9}>
          <DatePicker
            className="form-control"
            locale="ru"
            selected={startDate}
            onChange={(date) => handleDateDoc(date)}
            dateFormat="dd.MM.YYYY HH:MM"
            showTimeSelect
            disabled={isLogist}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Номер</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            placeholder="Номер"
            value={cs(item.number)}
            name="number"
            onChange={handler}
            disabled={isLogist}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Точка доставки</CCol>
        <CCol sm={9}>
          <Select
            options={optionsC}
            onChange={handleCompany}
            value={selectedOption}
            onInputChange={handleInput}
            isDisabled={isLogist}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Дата доставки</CCol>
        <CCol sm={9}>
          <DatePicker
            className="form-control"
            locale="ru"
            selected={departDate}
            onChange={(date) => handleDateDep(date)}
            dateFormat="dd.MM.YYYY"
            disabled={isLogist}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Вес</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            placeholder="вес"
            value={cs(item.weight)}
            name="weight"
            onChange={(e) => handler(e, 'dec')}
            disabled={isLogist}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Стоимость груза</CCol>
        <CCol sm={9}>
          <CFormInput
            type="text"
            placeholder="Номер"
            value={cs(item.totalCost)}
            name="totalCost"
            onChange={(e) => handler(e, 'dec')}
            disabled={isLogist}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Статус</CCol>
        <CCol sm={9}>{cs(item.status)}</CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol sm={3}>
          <CButton onClick={saveData} className="btn btn-primary" disabled={isLogist}>
            Сохранить
          </CButton>
          <CButton onClick={close} className="btn btn-primary ms-1 ">
            Закрыть
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

        {/*<CCol sm={1}>*/}
        {/*  <CSpinner color="primary" variant="grow" className={isLoading ? '' : 'd-none'} />*/}
        {/*</CCol>*/}
      </CRow>
    </>
  )
}
export default Invoice
