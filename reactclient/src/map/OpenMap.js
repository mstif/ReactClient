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
import markerIcon from 'src/map/images/marker-icon.png'
import markerIcon_shadow from 'src/map/images/marker-shadow.png'
import 'src/map/leaflet.css'
//import '../../js/leaflet.js'
//import { MapContainer, TileLayer, useMap, Marker, Popup } from 'https://cdn.esm.sh/react-leaflet'
function AdressToMap(points) {
  if (typeof L !== 'undefined') {
    var map = L.map('map').setView([55.677584, 37.683105], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    //var marker = L.marker([55.677584, 37.683105]).addTo(map);
    // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    //var popup = L.popup()
    //    .setLatLng([55.6, 37.683105])
    //    .setContent("I am a standalone popup.")
    //    .openOn(map);
    //map.on('click', onMapClick)
    $('.leaflet-attribution-flag').remove()

    $.each(points, function (i, a) {
      let lat = parseFloat(a.lat)
      let lon = parseFloat(a.lon)
      let name = a.name
      if (!isNaN(lon) && !isNaN(lat)) {
        let adress = a.address
        var greenIcon = L.icon({
          iconUrl: markerIcon,
          shadowUrl: markerIcon_shadow,
        })
        var markerp = L.marker([lat, lon], { icon: greenIcon }).addTo(map)
        markerp.bindPopup('<b>' + name + '</b><br>' + adress).openPopup()
      }
    })
  }
}

function onMapClick(e) {
  alert('You clicked the map at ' + e.latlng)
}

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
  const points = location.state.points
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'src/map/leaflet.js'
    script.async = true
    document.body.appendChild(script)
    const script1 = document.createElement('script')
    script1.src = 'src/map/mmap.js'
    //script1.async = true
    document.body.appendChild(script1)
    AdressToMap(points)
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: content }} />
}
export default OpenMap1
