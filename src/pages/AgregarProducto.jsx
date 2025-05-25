import React, { useState } from 'react';
import '../agregarproducto.css';
import { Link } from 'react-router-dom';
import { categoriasPredeterminadas } from '../data/categorias';
const AgregarProducto = ({ agregarProducto, productoEditar, onSubmit, onCancel }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    presentacion: '',
    categoria: '',
    descripcion: '',
    stock: '',
    imagen: null
  });

  const [preview, setPreview] = useState(null);


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
      setProducto(prev => ({ ...prev, imagen: reader.result }));
    };
    reader.readAsDataURL(file);
  } else {
    setPreview(null);
    setProducto(prev => ({ ...prev, imagen: null }));
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();


    if (
      !producto.nombre ||
      !producto.presentacion ||
      !producto.categoria ||
      !producto.descripcion ||
      !producto.stock ||
      !producto.imagen
    ) {
      alert('Por favor complete todos los campos');
      return;
    }

 
    const nuevoId = Date.now(); // o productos.length + 1 si tienes acceso a la lista

    const nuevoProducto = { 
    nombre: producto.nombre,
    presentacion: producto.presentacion,
    categoria: producto.categoria,
    descripcion: producto.descripcion,
    stock: producto.stock,
    imagen: producto.imagen,
    
  };


    agregarProducto(nuevoProducto);

    console.log('Producto agregado:', producto);
    alert('Producto agregado con éxito');

    setProducto({
      nombre: '',
      presentacion: '',
      categoria: '',
      descripcion: '',
      stock: '',
      imagen: null
    });
    setPreview(null);
  };

  return (
    <div className="form-container">
  <h2>Agregar un producto</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-row">
  <input
    type="text"
    name="nombre"
    value={producto.nombre}
    onChange={handleChange}
    placeholder="Nombre del producto"
  />
  <input
    type="text"
    name="presentacion"
    value={producto.presentacion}
    onChange={handleChange}
    placeholder="Presentación"
  />
</div>
   
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <select
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            required
            style={{  flex: 1  }}
          >
            <option value="">Selecciona una categoría</option>
            {categoriasPredeterminadas.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Link
            to="/categorias/nueva"
            className="btn-agregar-categoria-form"
            title="Agregar nueva categoría"
          >+
          </Link>
        </div>
     
    
    <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción" />


    <input name="stock" value={producto.stock} onChange={handleChange} placeholder="Stock" />
    
    <div className="image-upload">
      <p>Arrastra una imagen o</p>
      <label className="image-upload-label">
        Seleccionar imagen
        <input type="file" onChange={handleImageChange} />
        {preview && (
  <div>
    <p>Vista previa:</p>
    <img src={preview} alt="Vista previa" style={{ width: 100, height: 100, objectFit: 'cover' }} />
  </div>
)}

      </label>
    </div>

    <button className="submit-button" type="submit">Crear producto</button>
  </form>
</div>
  );
};

export default AgregarProducto;