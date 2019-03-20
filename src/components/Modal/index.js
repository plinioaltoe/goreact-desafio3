import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import './style.css'

const Modal = ({ showModal, handleCloseModal, handlChangeRepository, repositoryInput, handleAddRepository }) => {
  return (
    <div>
      <form onSubmit={handleAddRepository}>
        <Dialog open={showModal} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
          <div className="modal">
            <DialogTitle id="form-dialog-title" className="title">
              Adicionar novo usuário
            </DialogTitle>
            <DialogContent className="content">
              <input
                className="textbox"
                type="text"
                placeholder="Usuário do GitHub"
                value={repositoryInput}
                onChange={handlChangeRepository}
              />
            </DialogContent>
            <DialogActions>
              <button onClick={handleCloseModal} className="buttonCancel">
                Cancelar
              </button>
              <button onClick={handleCloseModal} className="buttonOk">
                Salvar
              </button>
            </DialogActions>
          </div>
        </Dialog>
      </form>
    </div>
  )
}

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handlChangeRepository: PropTypes.func.isRequired,
  repositoryInput: PropTypes.string.isRequired,
  handleAddRepository: PropTypes.func.isRequired,
}

export default Modal
