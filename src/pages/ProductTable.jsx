import React, { useState } from 'react';
import '../ProductTable.css';
import { Link } from 'react-router-dom';

const PRODUCTOS_POR_PAGINA = 10;

const ProductTable = ({ productos, eliminarProducto, onEdit }) => {
const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  // Filtrar productos por ID (puedes adaptar para buscar por nombre también)
  const productosFiltrados = productos.filter(prod =>
    prod.id.toString().includes(busqueda)
  );

  // Calcular paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);
  const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const fin = inicio + PRODUCTOS_POR_PAGINA;
  const productosPagina = productosFiltrados.slice(inicio, fin);

  // Cambiar de página
  const irAPagina = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  // Reiniciar a la página 1 cuando cambie la búsqueda
  React.useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);


  return (
    <div className="wrapper">
      <div className="header-table">
      <h2 className="title">Listado de productos</h2>
      <Link to="#" className="btn-categorias" title="Categorías">
            Categorías
          </Link>
        <Link to="/" className="btn-agregar">
          Agregar producto
        </Link>
        <div className="barra-busqueda">
        <input
          type="text"
          placeholder="Buscar por ID..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <button className="btn-buscar">Buscar</button>
      </div>

        </div>
      <table className="table">
        <thead>
          <tr className="tr">
            <th className="ta">Id</th>
            <th className="th">Nombre</th>
            <th className="th">Presentación</th>
            <th className="th">Descripción</th>
            <th className="th">Categoría</th>
            <th className="th">Stock</th>
            <th className="th">Acciones</th>
          </tr>
        </thead>
        <tbody>
          
          {productosPagina.map((prod) => (
            <tr key={prod.id} className="tr">
              <td className="td">
                {console.log('Imagen:', prod.imagen)}
                {prod.imagen && (
                  <img src={prod.imagen} alt={prod.nombre} className="img" />
                )}
                <span className="id">#{prod.id.toString().padStart(4, '0')}</span>
              </td>

              
              <td className="td">{prod.nombre}</td>
              <td className="td">{prod.presentacion}</td>
              <td className="td">{prod.descripcion}</td>
              <td className="td">{prod.categoria}</td>
              <td className="td">{prod.stock}</td>
              <td className="td">
                <button
                  className="editBtn"
                  onClick={() => onEdit(prod)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => eliminarProducto(prod)}
                  title="Eliminar"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            <div className="paginacion">
        <button
          onClick={() => irAPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          &lt;
        </button>
        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i + 1}
            className={paginaActual === i + 1 ? 'activo' : ''}
            onClick={() => irAPagina(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => irAPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          &gt;
        </button>
      </div>


    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  imagen: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
  },
  botonEliminar: {
    backgroundColor: '#d9534f',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProductTable;