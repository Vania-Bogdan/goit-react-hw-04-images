import React, {useEffect} from "react";
import { createPortal } from 'react-dom';
import '../css/styles.css';


const selectedModal = document.querySelector('#modal');

export default function Modal({ largePicture, tags, onClose }) {
  
  useEffect(() => {
    const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  
  const handleClickBackdrop = e => {
    if (e.currentTarget === e.target) {
     onClose();
    }
  };
    
    return createPortal(
      <div className="Overlay" onClick={handleClickBackdrop}>
        <div className="Modal">
                <img src={largePicture} alt={tags} className="ModalImg"/>
        </div>
      </div>,
      selectedModal);
};
