import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as RepositoryActions } from '../../store/ducks/repository'

import Lista from '../../components/Lista'
import Mapa from '../../components/Mapa'

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Mapa />
        <Lista />
      </Fragment>
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
)(Main)
