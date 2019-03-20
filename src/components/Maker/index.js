import React from 'react'
import { Marker } from 'react-map-gl'
import PropTypes from 'prop-types'

import './style.css'

import 'mapbox-gl/dist/mapbox-gl.css'

const Maker = ({ handleMapClick, avatarUrl, latitude, longitude, repositoryUrl }) => {
  return (
    <Marker latitude={latitude} longitude={longitude} onClick={handleMapClick} captureClick={true}>
      <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
        <img className="avatarMap" alt="avatar" src={avatarUrl} />
      </a>
    </Marker>
  )
}

Maker.propTypes = {
  handleMapClick: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  repositoryUrl: PropTypes.string.isRequired,
}

export default Maker
