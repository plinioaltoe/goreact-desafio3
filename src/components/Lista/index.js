import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

const Lista = ({ showModal, handleCloseModal, handleOpenModal }) => {
  return (
    <div class="card">
      <div className="header">
        <div className="nickAndNameAndImg">
          <img className="avatarList" src="https://avatars2.githubusercontent.com/u/2254731?v=4" alt="Poker Face" />
          <div>
            <div className="name">Diego</div>
            <div className="nick">agora</div>
          </div>
        </div>
        <button className="excluir">
          <i className="fa fa-times-circle" />
        </button>
      </div>
      <hr />
    </div>
  )
}

Lista.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
}

export default Lista
