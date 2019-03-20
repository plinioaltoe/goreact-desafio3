import React from 'react'
import { Marker } from 'react-map-gl'
import PropTypes from 'prop-types'

import './style.css'

import 'mapbox-gl/dist/mapbox-gl.css'

const Maker = ({ handleMapClick }) => {
  return (
    <Marker latitude={-23.5439948} longitude={-46.6065452} onClick={handleMapClick} captureClick={true}>
      <img className="avatarMap" alt="avatar" src="https://avatars2.githubusercontent.com/u/2254731?v=4" />
    </Marker>
  )
}

Maker.propTypes = {
  handleMapClick: PropTypes.func.isRequired,
}

export default Maker
