import {
  cilHandPointLeft,
  cilLocationPin,
  cilPencil,
  cilPlus,
  cilTrash,
  cilSpreadsheet,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import * as signalR from '@microsoft/signalr'
import { useSelector, useDispatch } from 'react-redux'

const ActiveOrders = () => {
  const [items, setItems] = useState([])
  //const cntMessageValue = useSelector((gs) => gs.countMessages)
  const [notificationConnection, setNotificationConnection] = useState(null)
  const dispatch = useDispatch()
  //const cntMessageFromLS = localStorage.getItem("Messages")?.cntMessages
  //const [cntMess, setCnt] = useState(JSON.parse(localStorage.getItem("Messages"))?.cntMessages??0)
  const [notifications, setNotifications] = useState([]) // State for notifications
  const [filters, setFilters] = useState({ ['itemsPerPage']: 20, ['page']: 1 })
  const [offers, setOffers] = useState([])
  const [currentOrder, setCurrentOrder] = useState({
    logisticOffers: [],
    seller: { title: '' },
    logisticCompany: { title: '' },
    status: '',
    deliveryContract: { totalCostDelivery: 0 },
  })
  const roles = localStorage.getItem('roles')
  let settingsUser = localStorage.getItem('settingsUser')
  let CompanyId = 0
  if (settingsUser != undefined && settingsUser != 'null') {
    CompanyId = JSON.parse(settingsUser).CompanyId
  }
  const isAdmin = roles.includes('Administrator')
  const isSeller = roles.includes('Customer')

  const isLogist = roles.includes('Logist')
  const [logistCosts, setLogistCosts] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleInfo, setVisibleInfo] = useState(false)
  const getApiData = async () => {
    const response = await fetch('/api/Order/list-orders-dashboard', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    }).then((response) => response.json())

    setItems(response)
    let costs = response.map((t) => {
      return t.logisticOffers.find((s) => s.logisticCompany.id == CompanyId)
    })
    setLogistCosts(costs)

  }

  useEffect(() => {
    getApiData()
  }, [])

  useEffect(() => {
    const newNotificationConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7239/exchangeHub') // , {
      //     accessTokenFactory: () => token
      // }
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build()

    setNotificationConnection(newNotificationConnection)
  }, [])

  useEffect(() => {
    if (notificationConnection) {
      notificationConnection
        .start()
        .then(() => {
          console.log('Connected to Notification Hub!')

          notificationConnection.on('ReceiveMessage', (role, companyTarget, message) => {
            // setNotifications((notifications) => [...notifications, message])

            getApiData()

            let cnt = JSON.parse(localStorage.getItem('Messages'))?.cntMessages ?? 0
            let notifs = JSON.parse(localStorage.getItem('Messages'))?.notifs ?? []
            if (
              (roles?.includes(role) || role == '') &&
              (companyTarget == CompanyId || companyTarget == 0)
            ) {
              notifications.push(message)
              localStorage.setItem(
                'Messages',
                JSON.stringify({ cntMessages: cnt + 1, notifs: notifications }),
              )
              dispatch({ type: 'addMessage', notifications: notifications })
              dispatch({ type: 'addMessage', countMessages: cnt + 1 })
            }
            //localStorage.setItem('Messages', JSON.stringify({ cntMessages: cnt + 1, notifs: [] }))
            //dispatch({ type: 'addMessage', countMessages: cnt + 1 })
          })
        })
        .catch((e) => console.log('Notification Connection failed: ', e))
    }
  }, [notificationConnection])
  function handleEdit(id) {
    document.location = '#/order/' + id
  }

  const handleDelete = async (id) => {
    const response = await fetch('/api/Order/delete?id=' + id, {
      method: 'DELETE',
      credentials: 'include',
    }).then((response) => getApiData())
  }
  const chooseCompany = (order) => {
    setCurrentOrder(order)
    if (order.status == 'Предложен') {
      setVisibleInfo(!visibleInfo)
      return
    }
    if (order.deliveryContract == null) {
      setVisible(!visible)
    } else {
      setVisibleInfo(!visibleInfo)
    }
  }
  const choose = (offer) => {
    acceptOfferApi(offer.orderId, offer.logisticCompany.id)
    setVisible(false)
  }
  const acceptOffer = () => {
    var table = document.getElementById('tab1')
    let logistId = 0
    for (var i = 1, row; (row = table.rows[i]); i++) {
      if (row.cells[1].firstChild.checked) {
        logistId = row.cells[5].firstChild.data
        break
      }
    }
    acceptOfferApi(currentOrder.id, logistId)
    setVisible(false)
  }

  const finishOrder = async (orderId) => {
    var param = { orderId: orderId, status: 'Завершено', orderDto: { id: orderId } }
    const response = await fetch('/api/Order/set-status-order?orderId=' + param.orderId, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    }).then((response) => response.json())
    await getApiData()
  }

  const cancelOfferForLogist = async () => {
    var param = { orderId: currentOrder.id }
    const response = await fetch('/api/Order/cancel-offer-tologistic?orderId=' + param.orderId, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    }).then((response) => response.json())
    setVisibleInfo(false)
    await getApiData()
  }
  //???????????
  const acceptOfferApi = async (orderId, logistId) => {
    if (orderId > 0 && logistId > 0) {
      var param = { orderId: orderId, logistic: logistId }
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
      await getApiData()
    }
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
  const getTotalCostOrder = (item) => {
    let res =
      item.deliveryContract == null
        ? isSeller || isAdmin
          ? item.logisticOffers.length
            ? item.logisticOffers[0].amount
            : ''
          : logistCosts.find((s) => s != undefined && s.orderId == item.id)?.amount
        : item.deliveryContract.totalCostDelivery

    return res
  }
  const getAction = () => {
    if (currentOrder.status == 'Предложен') {
      return { title: 'Отозвать предложение лог. компании', act: cancelOfferForLogist }
    }
    if (currentOrder.status == 'В работе') {
      return { title: 'Завершить', act: finishOrder }
    }
    return { title: 'Неопределено', act: () => {} }
  }

  const handler1 = (e) => {
    var table = document.getElementById('tab1')

    for (var i = 1, row; (row = table.rows[i]); i++) {
      let offerId = row.cells[0].firstChild.data
      if (e.target.id == 'chk1' + offerId) continue
      if (row.cells[1].firstChild.checked) {
        row.cells[1].firstChild.checked = false

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
            <CCardHeader>Активные заказы</CCardHeader>
            <CCardBody>
              <CNav variant="pills" className="card-header-pills">
                <CNavItem>
                  <CNavLink
                    href="#/order/0"
                    className={
                      'text-primary m-2 font-weight-bold ' + (isSeller || isAdmin ? '' : 'd-none')
                    }
                  >
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
                    <CTableHeaderCell className="bg-body-tertiary">Заказ</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Дата доставки</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Вес</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Расстояние</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      {isSeller || isAdmin ? 'Предложения' : 'Стоимость'}
                    </CTableHeaderCell>
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
                      <CTableDataCell className="small">{item.title}</CTableDataCell>
                      <CTableDataCell className="small">
                        <div className="small">
                          <Moment format="DD.MM.YY">{item.dateDeparture}</Moment>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="small">{item.totalWeight}</CTableDataCell>
                      <CTableDataCell className="small">{item.totalDistance}</CTableDataCell>
                      <CTableDataCell className="small">
                        <CNavLink
                          //href="#"
                          className={'text-primary m-2 font-weight-bold '}
                          onClick={() => chooseCompany(item)}
                        >
                          {item.deliveryContract == null
                            ? isSeller || isAdmin
                              ? item.logisticOffers.length
                                ? item.status == 'Новый'
                                  ? item.logisticOffers[0].amount
                                  : item.logisticOffers.find(
                                      (l) => l.logisticCompany.id == item.logisticCompany.id,
                                    )?.amount
                                : ''
                              : logistCosts.find((s) => s != undefined && s.orderId == item.id)
                                  ?.amount
                            : item.deliveryContract.totalCostDelivery}
                        </CNavLink>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="ghost"
                          onClick={() => chooseCompany(item)}
                        >
                          <CIcon size="sm" icon={cilSpreadsheet}></CIcon>
                        </CButton>
                        <CButton
                          color="primary"
                          variant="ghost"
                          onClick={(e) => handleEdit(item.id)}
                        >
                          <CIcon size="sm" icon={cilPencil}></CIcon>
                        </CButton>
                        <CButton color="primary" variant="ghost">
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

      <CModal
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredScrollableExample2"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample2">
            Выбрать предложение доставщиков
            <p>
              {' (Заказ ' + currentOrder.number + ' от '}
              <Moment format="DD.MM.YY">{currentOrder.date}</Moment>
              {' )'}
            </p>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable align="middle" className="mb-0 border" hover responsive id="tab1">
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="d-none"></CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary"></CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Компания</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Стоимость доставки</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Действия</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentOrder.logisticOffers.map((offer, index1) => (
                <CTableRow v-for="item in tableItems" key={index1}>
                  <CTableDataCell className="text-center d-none">{offer.offerId}</CTableDataCell>
                  <CTableDataCell className="text-center small">
                    <CFormCheck id={'chk1' + offer.offerId} onClick={handler1} />
                  </CTableDataCell>
                  <CTableDataCell className="small">{offer.logisticCompany.name}</CTableDataCell>
                  <CTableDataCell className="small">{offer.amount}</CTableDataCell>

                  <CTableDataCell>
                    <CButton color="primary" variant="ghost" onClick={(e) => choose(offer)}>
                      <CIcon size="sm" icon={cilHandPointLeft}></CIcon>
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell className=" d-none">{offer.logisticCompany.id}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Закрыть
          </CButton>
          <CButton color="primary" onClick={acceptOffer}>
            Принять предложение доставки{' '}
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        alignment="center"
        scrollable
        visible={visibleInfo}
        onClose={() => setVisibleInfo(false)}
        aria-labelledby="VerticallyCenteredScrollableExample3"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample3">
            Информация по заказу
            <p>
              {' (Заказ ' + currentOrder.number + ' от '}
              <Moment format="DD.MM.YY">{currentOrder.date}</Moment>
              {' )'}
            </p>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="mb-3">
            <CCol sm={7}>Статус заказа:</CCol>
            <CCol>
              <b>{currentOrder.status}</b>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={7}>Компания-клиент:</CCol>
            <CCol>
              <b>{currentOrder.seller.title}</b>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={7}>Компания-доставщик:</CCol>
            <CCol>
              <b>{currentOrder.logisticCompany?.title}</b>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={7}>Стоимость услуг по договору:</CCol>
            <CCol>
              <b>{currentOrder.deliveryContract?.totalCostDelivery}</b>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setVisibleInfo(false)}>
            Закрыть
          </CButton>
          <CButton
            color="secondary"
            onClick={getAction().act}
            className={currentOrder.status == 'В работе' ? 'd-none' : 'secondary'}
          >
            {getAction().title}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ActiveOrders
