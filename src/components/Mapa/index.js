import React, { Component } from 'react'
import MapGL from 'react-map-gl'

import Maker from '../Maker'
import Modal from '../Modal'

import 'mapbox-gl/dist/mapbox-gl.css'

export default class Mapa extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.5439948,
      longitude: -46.6065452,
      zoom: 14,
    },
    showModal: false,
  }

  componentDidMount = () => {
    window.addEventListener('resize', this._resize)
    this._resize()
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this._resize)
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      repositoryInput: '',
    })
  }

  handleMapClick = e => {
    this.handleOpenModal()
    const [latitude, longitude] = e.lngLat

    //alert(`Latitude: ${latitude} \nLongitude: ${longitude}`)
  }

  handlChangeRepository = e => {
    this.setState({ repositoryInput: e.target.value })
  }

  handleAddRepository = e => {
    e.preventDefault()
    const { addRepositoryRequest } = this.props
    addRepositoryRequest(this.state.repositoryInput)
    this.setState({ repositoryInput: '' })
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { handleCloseModal, handleMapClick, state, handlChangeRepository, handleAddRepository } = this
    const { showModal, viewport, repositoryInput } = state
    return (
      <MapGL
        {...viewport}
        onClick={handleMapClick}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken={
          'pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ'
        }
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <Maker handleMapClick={handleMapClick} />
        <Modal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handlChangeRepository={handlChangeRepository}
          repositoryInput={repositoryInput}
          handleAddRepository={handleAddRepository}
        />
      </MapGL>
    )
  }
}
