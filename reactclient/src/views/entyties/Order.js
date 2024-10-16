import React from 'react'
import classNames from 'classnames'
import { useState, useEffect, Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

const Order = () => {
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
    availableActions: [{ id: '', title: '' }],
  }
  const [item, setItem] = useState(initItem)
  const [isLoading, setLooding] = useState(false)
  const [isModified, setModified] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [departDate, setDepartDate] = useState(new Date())
  const [optionsC, setOptions] = useState([])
  const [optionsCargoType, setOptionsCargoType] = useState([])
  const [selectedOptionCargoType, setSelectedOptionCargoType] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [optionsLogist, setOptionsLogist] = useState([])
  const [selectedOptionLogist, setSelectedOptionLogist] = useState(null)
  const params = useParams()
  const getApiData = async (id) => {
    const itemId = id
    var query = 'api/Order/EditOrder?id=' + itemId
    if (itemId == 0) {
      query = 'api/Order/CreateOrder'
    }
    const response = await fetch(query, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((res) => {
        setOptions([{ value: res.seller?.id, label: res.seller?.title }])
        setSelectedOption({ value: res.seller?.id, label: res.seller?.title })
        setOptionsLogist([
          res.logisticCompany != null
            ? { value: res.logisticCompany?.id, label: res.logisticCompany?.title }
            : {},
        ])
        setSelectedOptionLogist(
          res.logisticCompany != null
            ? { value: res.logisticCompany?.id, label: res.logisticCompany?.title }
            : {},
        )
        setOptionsCargoType([{ value: res.cargoType?.id, label: res.cargoType?.title }])
        setSelectedOptionCargoType([{ value: res.cargoType?.id, label: res.cargoType?.title }])
        setItem(res)
        setStartDate(new Date(res.date))
        setDepartDate(new Date(res.dateDeparture))
      })
  }

  useEffect(() => {
    getApiData(params.id)
  }, [])

  const saveData = async () => {
    if (isLoading) return
    let query = '/api/Order/save-order'
    setLooding(true)
    const response = await fetch(query, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).then((response) => response.json())
    //setItem(response)
    await getApiData(response.id)
    setModified(false)

    setLooding(false)
  }

  const handler = (e) => {
    const { target } = e
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    setItem((f) => ({ ...f, [name]: value }))
    setModified(true)
  }

  const handleChange = (e) => {
    setRole(e.target.value)
  }
  const handleCompany = (e) => {
    setSelectedOption(e)
    setItem((f) => ({ ...f, ['seller']: { ['id']: e.value, ['title']: e.label } }))
    setModified(true)
  }
  const handleCompanyLogist = (e) => {
    setSelectedOptionLogist(e)
    setItem((f) => ({ ...f, ['logisticCompany']: { ['id']: e.value, ['title']: e.label } }))
    setModified(true)
  }
  const handleDateDoc = (e) => {
    setStartDate(e)
    setItem((f) => ({ ...f, ['date']: e }))
    setModified(true)
  }
  const handleDateDep = (e) => {
    setDepartDate(e)
    setItem((f) => ({ ...f, ['dateDeparture']: e }))
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
  const handleInputCargoType = (e) => {
    if (e.length >= 3) {
      var query = '/api/CargoType/list-cargotypes?search=' + e
      const response = fetch(query, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((commits) => fillCargoTypes(commits))
    }
  }
  const handleCargoType = (e) => {
    setSelectedOptionCargoType(e)
    setItem((f) => ({ ...f, ['cargoType']: { ['id']: e.value, ['title']: e.label } }))
    setModified(true)
  }
  function fill(commits) {
    var t = commits.map((f) => ({ ['value']: f.id, ['label']: f.name }))
    setOptions(t)
  }
  function fillCargoTypes(commits) {
    var t = commits.map((f) => ({ ['value']: f.id, ['label']: f.name }))
    setOptionsCargoType(t)
  }
  const handleInputLogist = (e) => {
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
        .then((commits) => fillLogist(commits))
    }
  }

  function fillLogist(commits) {
    var t = commits.map((f) => ({ ['value']: f.id, ['label']: f.name }))
    setOptionsLogist(t)
  }
  const cs = (val) => {
    if (val == null) return ''
    else return val
  }
  const cn = (val) => {
    if (val == null) return 0
    else return val
  }

  const handleActionsChange = async (e) => {
    if (e.target.text == 'Предложить лог. компании') {
      var param = { orderId: item.id, logistic: item.logisticCompany.id }
      const response = await fetch(
        '/api/Order/make-offer-tologistic?orderId=' + param.orderId + '&logistic=' + param.logistic,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(param),
        },
      ).then((response) => response.json())
      await getApiData(param.orderId)
      //setItem(response)
      setModified(false)
      setLooding(false)
    }
    if (e.target.text == 'Отозвать предложение лог. компании') {
      var param = { orderId: item.id }
      const response = await fetch('/api/Order/cancel-offer-tologistic?orderId=' + param.orderId, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
      }).then((response) => response.json())
      await getApiData(param.orderId)
      //setItem(response)
      setModified(false)
      setLooding(false)
    }
  }

  return (
    <>
      <CRow className="mb-3">
        <CCol sm={2}>
          <CDropdown>
            <CDropdownToggle color="secondary">Действия с заказом:</CDropdownToggle>
            <CDropdownMenu>
              {item.availableActions.map((a) => (
                <CDropdownItem key={a.id} onClick={handleActionsChange}>
                  {a.title}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
        </CCol>
      </CRow>
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
            name="name"
            onChange={handler}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Логистическая компания</CCol>
        <CCol sm={9}>
          <Select
            options={optionsLogist}
            onChange={handleCompanyLogist}
            value={selectedOptionLogist}
            onInputChange={handleInputLogist}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Заказчик доставки</CCol>

        <CCol sm={9}>
          {/*<CFormSelect*/}
          {/*  aria-label="Default select example"*/}
          {/*  options={[]}*/}
          {/*  onChange={handler}*/}
          {/*  name="allCompanies"*/}
          {/*  value={''}*/}
          {/*/>*/}
          <Select
            options={optionsC}
            onChange={handleCompany}
            value={selectedOption}
            onInputChange={handleInput}
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
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Тип груза</CCol>

        <CCol sm={9}>
          {/*<CFormSelect*/}
          {/*  aria-label="Default select example"*/}
          {/*  options={[]}*/}
          {/*  onChange={handler}*/}
          {/*  name="allCompanies"*/}
          {/*  value={''}*/}
          {/*/>*/}
          <Select
            options={optionsCargoType}
            onChange={handleCargoType}
            value={selectedOptionCargoType}
            onInputChange={handleInputCargoType}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>Статус</CCol>
        <CCol sm={9}>{cs(item.status)}</CCol>
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

        {/*<CCol sm={1}>*/}
        {/*  <CSpinner color="primary" variant="grow" className={isLoading ? '' : 'd-none'} />*/}
        {/*</CCol>*/}
      </CRow>
    </>
  )
}
export default Order
