import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CBadge,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const cntMessageValue = useSelector((gs) => gs.countMessages)
  const notifs = useSelector((gs) => gs.notifications)
  useEffect(() => {
    let cnt = JSON.parse(localStorage.getItem('Messages'))?.cntMessages ?? 0
    let notifslocal = JSON.parse(localStorage.getItem('Messages'))?.notifs ?? []
    dispatch({ type: 'addMessage', countMessages: cnt })
    dispatch({ type: 'addMessage', notifications: notifslocal })
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])
  const clearNotifs = () => {
    localStorage.setItem('Messages', JSON.stringify({ cntMessages: 0, notifs: [] }))
    dispatch({ type: 'addMessage', notifications: [] })
    setVisible(false)
  }

  return (
    <>
      <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
        <CContainer className="border-bottom px-4" fluid>
          <CHeaderToggler
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            style={{ marginInlineStart: '-14px' }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderNav className="d-none d-md-flex">
            <CNavItem>
              <CNavLink to="/dashboard" as={NavLink}>
                Активные заказы
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Пользователи</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Настройки</CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav className="ms-auto">
            <CNavItem>
              <CNavLink className="position-relative" onClick={() => setVisible(true)}>
                <CIcon icon={cilBell} size="lg" />
                <CBadge
                  color="danger"
                  position="top-start"
                  shape="rounded-pill"
                  size="sm"
                  className={notifs?.length == 0 ? 'd-none' : ''}
                >
                  {notifs?.length}
                  <span className="visually-hidden">unread messages</span>
                </CBadge>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">
                <CIcon icon={cilList} size="lg" />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">
                <CIcon icon={cilEnvelopeOpen} size="lg" />
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav>
            <li className="nav-item py-1">
              <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <CDropdown variant="nav-item" placement="bottom-end">
              <CDropdownToggle caret={false}>
                {colorMode === 'dark' ? (
                  <CIcon icon={cilMoon} size="lg" />
                ) : colorMode === 'auto' ? (
                  <CIcon icon={cilContrast} size="lg" />
                ) : (
                  <CIcon icon={cilSun} size="lg" />
                )}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  active={colorMode === 'light'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('light')}
                >
                  <CIcon className="me-2" icon={cilSun} size="lg" /> Light
                </CDropdownItem>
                <CDropdownItem
                  active={colorMode === 'dark'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('dark')}
                >
                  <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
                </CDropdownItem>
                <CDropdownItem
                  active={colorMode === 'auto'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('auto')}
                >
                  <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <li className="nav-item py-1">
              <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
        <CContainer className="px-4" fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
      <CModal
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredScrollableExample2"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample2">Уведомления</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {notifs.map((notification) => (
            <p className="small" key={notification}>
              {notification}
            </p>
          ))}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Закрыть
          </CButton>
          <CButton color="primary" onClick={clearNotifs}>
            Очистить
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AppHeader
