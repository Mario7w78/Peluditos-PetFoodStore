import React from 'react';
import '../ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ producto, onConfirm, onCancel }) => {
  if (!producto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Eliminar producto</h2>
        <div className="modal-icon">
          {/* Puedes usar un SVG o una imagen */}
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#FF5A36"/>
            <path d="M20 20L44 44" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
            <path d="M44 20L20 44" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="modal-text">
          ¿Estas seguro que deseas eliminar el producto <b>“{producto.nombre}”</b>?
        </p>
        <div className="modal-actions">
          <button className="modal-btn modal-btn-danger" onClick={onConfirm}>
            Sí, eliminar
          </button>
          <button className="modal-btn modal-btn-cancel" onClick={onCancel}>
            No, cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
