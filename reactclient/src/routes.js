import React from 'react'

//pooling
//const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Dashboard = React.lazy(() => import('./views/entyties/ActiveOrders'))
const ContragentList = React.lazy(() => import('./views/entyties/ContragentList'))
const Nsi = React.lazy(() => import('./views/dashboard/Nsi'))
const Contragent = React.lazy(() => import('./views/entyties/Contragent'))
const OpenMap1 = React.lazy(() => import('./map/OpenMap'))
const UserList = React.lazy(() => import('./views/entyties/UserList'))
const User = React.lazy(() => import('./views/entyties/User'))
const Settings = React.lazy(() => import('./views/dashboard/Settings'))
const OrderList = React.lazy(() => import('./views/entyties/OrderList'))
const Order = React.lazy(() => import('./views/entyties/Order'))
const ActiveOrders = React.lazy(() => import('./views/entyties/ActiveOrders'))
const ActiveOrdersForLogist = React.lazy(() => import('./views/entyties/ActiveOrdersForLogist'))
const LogisticPrice = React.lazy(() => import('./views/entyties/LogisticPrice'))
const Invoice = React.lazy(() => import('./views/entyties/Invoice'))
const DeliveryContractsList = React.lazy(() => import('./views/entyties/DeliveryContractsList'))
const CargoTypeList = React.lazy(() => import('./views/entyties/CargoTypeList'))
///
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
function Redirect() {
  //window.location.replace('#/map/map.html')
  window.location.href = '#/map/map.html'
  return <></>
}
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/companies', name: 'Контрагенты', element: ContragentList },
  { path: '/nsi', name: 'НСИ и документы', element: Nsi },
  { path: '/contragent', name: 'Контрагент (редактирование)', element: Contragent },
  { path: '/contragent/:id', name: 'Контрагент (редактирование)', element: Contragent },
  { path: '/openmap/', name: 'Карта', element: OpenMap1 },
  { path: '/user', name: 'Профиль пользователя', element: User },
  { path: '/user/:id', name: 'Профиль пользователя', element: User },
  { path: '/settings', name: 'Настройки', element: Settings },
  { path: '/settings/userlist', name: 'Пользователи', element: UserList },
  { path: '/orders', name: 'Заказы', element: OrderList },
  { path: '/order/:id', name: 'Заказ', element: Order },
  { path: '/order', name: 'Заказ', element: Order },
  { path: '/active-orders', name: 'Заказы продавца', element: ActiveOrders },
  { path: '/active-orders-logist', name: 'Заказы доставщиков', element: ActiveOrdersForLogist },
  { path: '/prices', name: 'Прайс-лист', element: LogisticPrice },
  { path: '/prices/:id', name: 'Прайс-лист', element: LogisticPrice },
  { path: '/invoice/:id', name: 'Накладная (редактирование)', element: Invoice },
  { path: '/delivery-contracts', name: 'Договора', element: DeliveryContractsList },
  { path: '/cargo-types', name: 'Типы грузов', element: CargoTypeList },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
