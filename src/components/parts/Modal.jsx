import React, { Component } from "react";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import '../css/styles.css';


const selectedModal = document.querySelector('#modal');

class Modal extends Component {
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  };
 
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleClickBackdrop = e => {
    if (e.currentTarget === e.target) {
    this.props.onClose();
    }
  };
    
  render() {
    const { largePicture, tags } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleClickBackdrop}>
        <div className="Modal">
          <img src={largePicture} alt={tags} />
        </div>
      </div>,
      selectedModal);
  }
};


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  tags: PropTypes.array,
  largePicture: PropTypes.string,
};

export default Modal;