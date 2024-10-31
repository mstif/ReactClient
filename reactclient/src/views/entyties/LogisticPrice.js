import React from 'react'
import classNames from 'classnames'
import { useState, useEffect, Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Moment from 'react-moment'
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
  CFormLabel,
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
  cilPlus,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const LogisticPrice = () => {
  const initItems = [
    {
      startDate: '',
      CostPerTnKm: 0,
      costStart: '',
      LogisticCompanyId: 0,
    },
  ]
  const initItem = {
    startDate: '',
    CostPerTnKm: 0,
    costStart: '',
    LogisticCompanyId: 0,
    logisticCompany: { name: '' },
  }

  const [items, setItems] = useState(initItems)
  const [item, setItem] = useState(initItem)
  const [isLoading, setLooding] = useState(false)
  const [isModified, setModified] = useState(false)
  const params = useParams()
  const getApiData = async () => {
    const logistId = params.id
    const response = await fetch('/api/LogisticPrice/history-price/' + logistId, {
      method: 'GET',
      credentials: 'include',
    }).then((response) => response.json())

    setItems(response)
    if (response.length) setItem(response[response.length - 1])
  }

  useEffect(() => {
    getApiData()
  }, [])

  const saveData = async () => {
    if (isLoading) return
    let meth = 'POST'
    let query = '/api/LogisticPrice/create'
    //if (item.id > 0) {
    //  query = '/api/LogisticPrice/update'
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
    getApiData()
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

  const handleDateDoc = (e) => {
    setItem((f) => ({ ...f, ['startDate']: e }))
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
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              {'Прайс-лист логистической компании ' + item.logisticCompany.name}
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol sm={3}> Стоимость подачи</CCol>
                <CCol sm={9}>
                  <CFormInput
                    type="text"
                    id="costStart"
                    name="costStart"
                    placeholder="Стоимость подачи"
                    value={cs(item.costStart)}
                    onChange={handler}
                    className="small"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={3}> Стоимость тонно-километра</CCol>
                <CCol sm={9}>
                  <CFormInput
                    type="text"
                    id="costPerTnKm"
                    name="costPerTnKm"
                    placeholder="Стоимость тн*км"
                    value={cs(item.costPerTnKm)}
                    onChange={handler}
                    className="small"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={3}> Дата начала действия</CCol>
                <CCol sm={9}>
                  <DatePicker
                    className="form-control"
                    locale="ru"
                    selected={item.startDate}
                    onChange={(date) => handleDateDoc(date)}
                    dateFormat="dd.MM.YYYY"
                  />
                </CCol>
              </CRow>

              <CButton onClick={saveData} color="secondary" className="btn btn-secondary mb-2">
                Создать запись
              </CButton>

              <CTable align="middle" className="mb-0 border" hover responsive id="tab">
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Действует с</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Стоимость подачи
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Стоимость тн*км
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {items.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center d-none">{item.id}</CTableDataCell>
                      <CTableDataCell>
                        <Moment format="DD.MM.YYYY">{item.startDate}</Moment>
                      </CTableDataCell>
                      <CTableDataCell className="small">{item.costStart}</CTableDataCell>
                      <CTableDataCell>
                        <div className="small">{item.costPerTnKm}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
export default LogisticPrice
