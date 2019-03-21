import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as RepositoryActions } from '../../store/ducks/repository'

import './style.css'

const Lista = ({ repos, rmRepositoryRequest }) => {
  const { data: repositories } = repos

  return (
    <div className="card">
      {repositories.map(repository => (
        <Fragment key={repository.id}>
          <div className="header">
            <div className="nickAndNameAndImg">
              <img className="avatarList" src={repository.avatar_url} alt="Poker Face" />
              <div>
                <div className="name">{repository.name}</div>
                <div className="nick">{repository.login}</div>
              </div>
            </div>
            <button className="excluir" onClick={() => rmRepositoryRequest(repository.id)}>
              <i className="fa fa-times-circle" />
            </button>
          </div>
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

Lista.propTypes = {
  rmRepositoryRequest: PropTypes.func.isRequired,
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
    error: PropTypes.oneOfType([PropTypes.string]),
  }).isRequired,
}

const mapStateToProps = state => ({
  repos: state.repository,
})

const mapDispatchToProps = dispatch => bindActionCreators(RepositoryActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lista)
