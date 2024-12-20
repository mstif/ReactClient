import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/9.jpg'

const AppHeaderDropdown = () => {
  const idUser = localStorage.getItem('userId')
  const roles = localStorage.getItem('roles')
  const user = localStorage.getItem('user')
  const isAdmin = roles.includes('Administrator')
  const isSeller = roles.includes('Customer')
  const isLogist = roles.includes('Logist')
  async function logoutHandler(e) {
    const response = await fetch('api/securewebsite/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'Application/json',
        Accept: 'application/json',
      },
    })

    const data = await response.json()

    if (response.ok) {
      //localStorage.setItem('user', dataToSend.Email)
      document.location = '/'
    }
  }

  const navigate = useNavigate()
  const goToPath = () => {
    let path = '/settings'
    navigate(path)
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          Учетная запись
        </CDropdownHeader>
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilBell} className="me-2" />*/}
        {/*  Updates*/}
        {/*  <CBadge color="info" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilEnvelopeOpen} className="me-2" />*/}
        {/*  Уведомлений*/}
        {/*  <CBadge color="success" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilTask} className="me-2" />*/}
        {/*  Tasks*/}
        {/*  <CBadge color="danger" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilCommentSquare} className="me-2" />*/}
        {/*  Comments*/}
        {/*  <CBadge color="warning" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>*/}
        <CDropdownItem href={'#/user/' + idUser}>
          <CIcon icon={cilUser} className="me-2" />
          {user}
        </CDropdownItem>
        <CDropdownItem href="#/settings">
          <CIcon icon={cilSettings} className="me-2" />
          Настройки
        </CDropdownItem>
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilCreditCard} className="me-2" />*/}
        {/*  Payments*/}
        {/*  <CBadge color="secondary" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownItem href="#">*/}
        {/*  <CIcon icon={cilFile} className="me-2" />*/}
        {/*  Projects*/}
        {/*  <CBadge color="primary" className="ms-2">*/}
        {/*    42*/}
        {/*  </CBadge>*/}
        {/*</CDropdownItem>*/}
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={logoutHandler}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Выйти
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
