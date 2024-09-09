import React from 'react'
import classNames from 'classnames'
import { useState, useEffect, Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
//import { Helmet } from 'react-helmet'
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
} from '@coreui/icons'
import { Link, useLocation } from 'react-router-dom'
import 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'
import 'src/map/leaflet.css'
//import '../../js/leaflet.js'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'https://cdn.esm.sh/react-leaflet'

const content = `
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <title></title>
  <link rel="stylesheet" href="leaflet.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="leaflet.js"></script>
  <script src="mmap.js"></script>
</head>
<body>
  <div id="map" style="height:800px"></div>
</body>
</html>`
const OpenMap1 = () => {
  const location = useLocation()
  const { from } = location.state
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'src/map/leaflet.js'
    script.async = true
    document.body.appendChild(script)
    const script1 = document.createElement('script')
    script1.src = 'src/map/mmap.js'
    script1.async = true
    document.body.appendChild(script1)
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: content }} />
}
export default OpenMap1
