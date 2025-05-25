import React from 'react';
import ReactDOM from 'react-dom';
import '../Modal.css';

const Modal = ({ children, onClose }) => {
  // Evita que el click dentro del modal cierre el modal
  const handleContentClick = (e) => e.stopPropagation();

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Asegúrate de tener este div en public/index.html
  );
};

export default Modal;
