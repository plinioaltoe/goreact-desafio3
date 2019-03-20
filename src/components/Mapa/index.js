import React, { Component } from 'react'
import MapGL from 'react-map-gl'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as RepositoryActions } from '../../store/ducks/repository'

import Maker from '../Maker'
import Modal from '../Modal'

import 'mapbox-gl/dist/mapbox-gl.css'

class Mapa extends Component {
  static propTypes = {
    addFavoriteRequest: PropTypes.func.isRequired,
    favorites: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
      error: PropTypes.oneOf([null, PropTypes.string]),
    }).isRequired,
  }

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.5439948,
      longitude: -46.6065452,
      zoom: 14,
    },
    showModal: false,
    repositoryInput: '',
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
    })
  }

  handleMapClick = e => {
    this.handleOpenModal()
    const [latitude, longitude] = e.lngLat
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

const mapStateToProps = state => ({
  repository: state.repository,
})

const mapDispatchToProps = dispatch => bindActionCreators(RepositoryActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mapa)
