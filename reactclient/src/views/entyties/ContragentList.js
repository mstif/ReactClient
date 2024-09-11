import React from 'react'
import classNames from 'classnames'
import { useState, useEffect } from 'react'
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
import OpenMap1 from '../../map/OpenMap'

const ContragentsList = () => {
  const [items, setItems] = useState([])
  const [pointsAddr, setPoints] = useState([])
  const getApiData = async () => {
    const response = await fetch('/api/Contragent/list-contragents?NotActiveFilter=true', {
      method: 'GET',
      credentials: 'include',
    }).then((response) => response.json())

    setItems(response)
  }

  useEffect(() => {
    getApiData()
  }, [])

  function handleEdit(id) {
    document.location = '#/contragent/' + id
  }

  const handleDelete = async (id) => {
    const response = await fetch('/api/Contragent/delete?id=' + id, {
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
        points.push({
          lat: item.latitude,
          lon: item.longitude,
          address: item.address,
          name: item.name,
        })
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
            <CCardHeader>Контрагенты {' & '} Организации</CCardHeader>
            <CCardBody>
              <CNav variant="pills" className="card-header-pills">
                <CNavItem>
                  <CNavLink href="#/contragent/0" className="text-primary m-2 font-weight-bold">
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
                      from: 'companies',
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
                    <CTableHeaderCell className="bg-body-tertiary text-center"></CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilTranslate} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Наименование</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Адрес
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Роли</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      ИНН
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Действия</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {items.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center d-none">{item.id}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CFormCheck id={'chk' + index} onClick={handler} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={cifRu} title={'РФ'} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small">{item.name}</div>
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
                      <CTableDataCell className="small">{item.address}</CTableDataCell>
                      <CTableDataCell>
                        <div className="small">
                          <span>
                            {(item.clientCompany ? 'Продавец ' : '') +
                              (item.logisticCompany ? 'Логист ' : '') +
                              (item.deliveryPoint ? 'Точка доставки' : '')}
                          </span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center small">{item.inn}</CTableDataCell>
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

export default ContragentsList
