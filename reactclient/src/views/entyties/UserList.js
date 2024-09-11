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
    const response = await fetch('/api/securewebsite/userlist', {
      method: 'GET',
      credentials: 'include',
    }).then((response) => response.json())

    setItems(response)
  }

  useEffect(() => {
    getApiData()
  }, [])

  function handleEdit(id) {
    document.location = '#/user/' + id
  }

  const handleDelete = async (id) => {
    const response = await fetch('/api/Contragent/delete?id=' + id, {
      method: 'DELETE',
      credentials: 'include',
    }).then((response) => getApiData())
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Пользователи</CCardHeader>
            <CCardBody>
              <CNav variant="pills" className="card-header-pills">
                <CNavItem>
                  <CNavLink href="#/user/0" className="text-primary m-2 font-weight-bold">
                    <CIcon icon={cilPlus} />
                    Добавить
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTable align="middle" className="mb-0 border" hover responsive id="tab">
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="d-none"></CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center"></CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Имя
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Email
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Компания
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Роли
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Действия</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {items.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center d-none">{item.id}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CFormCheck id={'chk' + index} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="small">{item.userName}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-center">{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell className="small text-center">{item.company}</CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-center">
                          <span>{item.majorRole}</span>
                        </div>
                      </CTableDataCell>
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
