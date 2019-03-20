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
    addRepositoryRequest: PropTypes.func.isRequired,
    repos: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          avatar_url: PropTypes.string,
          repos_url: PropTypes.string,
          latitude: PropTypes.number,
          longitude: PropTypes.number,
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
    repoLatitude: 0,
    repoLongitude: 0,
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
    const [longitude, latitude] = e.lngLat
    this.setState({ showModal: true, repoLatitude: latitude, repoLongitude: longitude })
  }

  handlChangeRepository = e => {
    this.setState({ repositoryInput: e.target.value })
  }

  handleAddRepository = e => {
    e.preventDefault()
    const { addRepositoryRequest } = this.props
    const { repositoryInput, repoLatitude, repoLongitude } = this.state

    const action = {
      repository: repositoryInput,
      latitude: repoLatitude,
      longitude: repoLongitude,
    }
    addRepositoryRequest(action)
    this.setState({ repositoryInput: '', showModal: false })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { handleCloseModal, handleMapClick, state, handlChangeRepository, handleAddRepository } = this
    const { showModal, viewport, repositoryInput } = state
    const { repos } = this.props
    const { data: repositories } = repos

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
        {repositories.map(repository => (
          <Maker
            key={repository.id}
            handleMapClick={handleMapClick}
            avatarUrl={repository.avatar_url}
            latitude={repository.latitude}
            longitude={repository.longitude}
            repositoryUrl={repository.repos_url}
          />
        ))}

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
  repos: state.repository,
})

const mapDispatchToProps = dispatch => bindActionCreators(RepositoryActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mapa)
