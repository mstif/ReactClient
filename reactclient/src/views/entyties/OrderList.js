import React from 'react'
import classNames from 'classnames'
import { useState, useEffect } from 'react'
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
  CFormCheck,
  CNavLink,
  CNavItem,
  CNav,
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
  cifRu,
  cilTrash,
  cilPencil,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilTranslate,
  cilPlus,
  cilLocationPin,
  cilCircle,
} from '@coreui/icons'
import { Link, useLocation } from 'react-router-dom'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'


const OrderList = () => {
  const [items, setItems] = useState([])
  const [filters, setFilters] = useState({ ['itemsPerPage']: 20, ['page']: 1 })
  const getApiData = async () => {
    const response = await fetch('/api/Order/list-orders', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    }).then((response) => response.json())

    setItems(response)
  }

  useEffect(() => {
    getApiData()
  }, [])

  function handleEdit(id) {
    document.location = '#/order/' + id
  }

  const handleDelete = async (id) => {
    const response = await fetch('/api/Order/delete?id=' + id, {
      method: 'DELETE',
      credentials: 'include',
    }).then((response) => getApiData())
  }

  const toMap = () => {
    window.open('#/openmap', '_blank').focus()
  }
  const points = []
  const handler = (e) => {
    var table = document.getElementById('tab')
    points.length = 0
    for (var i = 1, row; (row = table.rows[i]); i++) {
      if (row.cells[1].firstChild.checked) {
        let cid = Number(row.cells[0].firstChild.data)
        //let id = cid.substring(4, cid.length)
        let item = items.find((it) => it.id === cid)
        if (item == undefined) continue
        for (var j = 0, invoice; (invoice = item.invoices[j]); j++) {
          points.push({
            lat: invoice.deliveryPoint.latitude,
            lon: invoice.deliveryPoint.longitude,
            address: invoice.deliveryPoint.address,
            name: invoice.deliveryPoint.name,
          })
        }

        //setPoints(points)
      }

      //iterate through rows
      //rows would be accessed using the "row" variable assigned in the for loop
      //for (var j = 0, col; (col = row.cells[j]); j++) {
      //  //iterate through columns
      //  //columns would be accessed using the "col" variable assigned in the for loop
      //}
    }
  }
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Заказы</CCardHeader>
            <CCardBody>
              <CNav variant="pills" className="card-header-pills">
                <CNavItem>
                  <CNavLink href="#/order/0" className="text-primary m-2 font-weight-bold">
                    <CIcon icon={cilPlus} />
                    Добавить
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <Link
                    to={{
                      pathname: '/openmap',
                      state: 'dataToPass',
                    }}
                    className="nav-link text-primary m-2 font-weight-bold"
                    state={{
                      from: 'orders',
                      points: points,
                    }}
                    //onClick={toMap}
                  >
                    <CIcon icon={cilLocationPin} />
                    На карту
                  </Link>
                </CNavItem>
              </CNav>
              <CTable align="middle" className="mb-0 border" hover responsive id="tab">
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="d-none"></CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary"></CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Статус</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Дата</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Номер</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Отправитель</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Доставка</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Вес</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Расстояние</CTableHeaderCell>

                    <CTableHeaderCell className="bg-body-tertiary">Действия</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {items.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center d-none">{item.id}</CTableDataCell>
                      <CTableDataCell className="text-center small">
                        <CFormCheck id={'chk' + index} onClick={handler} />
                      </CTableDataCell>
                      <CTableDataCell className="small">{item.status}</CTableDataCell>
                      <CTableDataCell className="small">
                        <Moment format="DD.MM.YY HH:MM">{item.date}</Moment>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small">{item.number}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span className="small">
                            {/*{item.clientCompany*/}
                            {/*  ? 'Продавец '*/}
                            {/*  : '' + item.logisticCompany*/}
                            {/*    ? 'Логист '*/}
                            {/*    : '' + item.deliveryPoint*/}
                            {/*      ? 'Точка доставки'*/}
                            {/*      : ''}*/}
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="small">{item.seller.title}</CTableDataCell>
                      <CTableDataCell>
                        <div className="small">
                          <Moment format="DD.MM.YY">{item.dateDeparture}</Moment>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="small">{item.totalWeight}</CTableDataCell>
                      <CTableDataCell className="small">{item.totalDistance}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="ghost"
                          onClick={(e) => handleEdit(item.id)}
                        >
                          <CIcon size="sm" icon={cilPencil}></CIcon>
                        </CButton>
                        <CButton
                          color="primary"
                          variant="ghost"
                          onClick={(e) => handleDelete(item.id)}
                        >
                          <CIcon size="sm" icon={cilTrash}></CIcon>
                        </CButton>
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

export default OrderList
