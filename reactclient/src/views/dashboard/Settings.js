import React from 'react'
import classNames from 'classnames'

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
  CNavLink,
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
  cilBook,
  cilFile,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
const roles = localStorage.getItem('roles')
const isAdmin = roles.includes('Administrator')
const Settings = () => {
  return isAdmin ? (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={6}>
              <h4 className="card-title mb-3">Пользователи и права доступа</h4>
              <CNavLink href="#/settings/userlist" className="text-primary m-2 font-weight-bold">
                <CIcon icon={cilUser} />
                <span className="m-2">Пользователи</span>
              </CNavLink>
            </CCol>
            <CCol sm={6}>
              <h4 className="card-title mb-3">Системные настройки</h4>
              {/*<CNavLink href="#" className="text-primary m-2 font-weight-bold">*/}
              {/*  <CIcon icon={cilFile} />*/}
              {/*  <span className="m-2">Заказы</span>*/}
              {/*</CNavLink>*/}
              {/*<CNavLink href="#" className="text-primary m-2 font-weight-bold">*/}
              {/*  <CIcon icon={cilFile} />*/}
              {/*  <span className="m-2">Договора</span>*/}
              {/*</CNavLink>*/}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  ) : null
}

export default Settings
