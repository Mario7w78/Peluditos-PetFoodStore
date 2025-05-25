import React, { useState, useEffect } from 'react';
import AgregarProducto from './pages/AgregarProducto';
import ProductTable from './pages/ProductTable';
import { Routes, Route, Link} from 'react-router-dom';
import ProductForm from './pages/ProductForm';
import ConfirmDeleteModal from './pages/ConfirmDeleteModal';
import Modal from './pages/Modal';
import { categoriasPredeterminadas } from './data/categorias';
import Dashboard from './pages/Dashboard';
function App() {
  const [productos, setProductos] = useState(() => {
    const productosGuardados = localStorage.getItem('productos');
    return productosGuardados ? JSON.parse(productosGuardados) : [];
  });

  // Guardar productos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);
  const [productoEditar, setProductoEditar] = useState(null);

  const reasignarIds = (lista) => {
    return lista.map((prod, index) => ({
      ...prod,
      id: index + 1, // IDs empiezan en 1
    }));
  };

  const [categorias, setCategorias] = useState(() => {
  const categoriasGuardadas = localStorage.getItem('categorias');
  return categoriasGuardadas ? JSON.parse(categoriasGuardadas) : [];
});;
  const [categoriaEditar, setCategoriaEditar] = useState(null);

  useEffect(() => {
  localStorage.setItem('categorias', JSON.stringify(categorias));
}, [categorias]);



  const agregarProducto = (nuevoProducto) => {
    // Añadir producto sin id
    const nuevaLista = [...productos, nuevoProducto];
    // Reasignar IDs
    const listaConIds = reasignarIds(nuevaLista);
    setProductos(listaConIds);
  };

  const editarProducto = (productoEditado) => {
    setProductos(productos.map(prod =>
      prod.id === productoEditado.id ? productoEditado : prod
    ));
    setProductoEditar(null);
  };

  const eliminarProducto = (id) => {
    const nuevaLista = productos.filter(prod => prod.id !== id);
    const listaConIds = reasignarIds(nuevaLista);
    setProductos(listaConIds);
  };

  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const pedirConfirmacionEliminar = (producto) => setProductoAEliminar(producto);

const confirmarEliminar = () => {
  eliminarProducto(productoAEliminar.id);
  setProductoAEliminar(null);
};



const cancelarEliminar = () => setProductoAEliminar(null);


  return (
    <>
      <nav>
        <Link to="/dashboard">Dashboard</Link> | {" "}
        <Link to="/tabla">Productos</Link> | {" "}
      </nav>
      <Routes>
        <Route path="/" element={<AgregarProducto agregarProducto={agregarProducto} categorias ={categorias} />} />
        <Route
          path="/tabla"
          element={
            <>
              {productoEditar ? (
                <Modal onClose={() => setProductoEditar(null)}>
                <ProductForm
                  productoEditar={productoEditar}
                  onSubmit={editarProducto}
                  onCancel={() => setProductoEditar(null)}
                  categorias={categoriasPredeterminadas}
                />
                </Modal>
              ) : null}
                <ConfirmDeleteModal
                  producto={productoAEliminar}
                  onConfirm={confirmarEliminar}
                  onCancel={cancelarEliminar}
                />
              
              <ProductTable
                productos={productos}
                eliminarProducto={pedirConfirmacionEliminar}
                onEdit={setProductoEditar}
              />
            </>
          }
        />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
