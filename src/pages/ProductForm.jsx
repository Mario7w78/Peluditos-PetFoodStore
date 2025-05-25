import React, { useState, useEffect } from 'react';
import '../ProductForm.css';

const ProductForm = ({ productoEditar, onSubmit, onCancel, categorias}) => {
  const [producto, setProducto] = useState({
    nombre: '',
    presentacion: '',
    categoria: '',
    descripcion: '',
    stock: '',
    imagen: null,
    imagenNombre: '',
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (productoEditar) {
      setProducto({
        ...productoEditar,
        imagenNombre: productoEditar.imagenNombre || '',
      });
      setPreview(productoEditar.imagen || null);
    } else {
      setProducto({
        nombre: '',
        presentacion: '',
        categoria: '',
        descripcion: '',
        stock: '',
        imagen: null,
        imagenNombre: '',
      });
      setPreview(null);
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setProducto(prev => ({
          ...prev,
          imagen: reader.result,
          imagenNombre: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación simple
    if (
      !producto.nombre ||
      !producto.presentacion ||
      !producto.categoria ||
      !producto.descripcion ||
      !producto.stock ||
      !preview
    ) {
      alert('Por favor complete todos los campos');
      return;
    }
    onSubmit({ ...producto, imagen: preview });
  };

  return (
    <div className="edit-form-container">
      <h2 className="edit-title">{productoEditar ? 'Editar' : 'Agregar'} producto</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="edit-form-left">
          <label>
            Nombre del producto
            <input
              type="text"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              className="edit-input"
              autoFocus
            />
          </label>
          <label>
            Presentación
            <input
              type="text"
              name="presentacion"
              value={producto.presentacion}
              onChange={handleChange}
              className="edit-input"
            />
          </label>
          <label>
            Categoría
            <select
              name="categoria"
              value={producto.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una categoría</option>
      {categorias.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
            </select>
          </label>
          <label>
            Descripción
            <textarea
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              className="edit-input"
              rows={3}
            />
          </label>
          <label>
            Stock
            <input
              type="number"
              name="stock"
              value={producto.stock}
              onChange={handleChange}
              className="edit-input"
              min={0}
            />
          </label>
        </div>
        <div className="edit-form-right">
          <label>
            Imagen {producto.imagenNombre && `: ${producto.imagenNombre}`}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="edit-input"
            />
          </label>
          <div className="edit-image-preview">
            {preview && (
              <img src={preview} alt="Vista previa" className="edit-img" />
            )}
          </div>
          <div className="edit-btns">
            <button type="submit" className="edit-btn">
              {productoEditar ? 'Editar producto' : 'Agregar producto'}
            </button>
            {onCancel && (
              <button type="button" className="cancel-btn" onClick={onCancel}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
