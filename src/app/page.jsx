import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Table,
  Button,
  Input,
  Form,
  Row,
  Col,
  Container,
} from 'reactstrap';

// Funciones
function getListaProductos() {
  // Obtiene los datos de la API
  const productos = await fetch('/api/productos');

  // Devuelve la lista de productos
  return productos.json();
}

// Componentes
const ListaProductos = ({ productos }) => {
  // Crea una tabla para mostrar la lista de productos
  const tablaProductos = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre del Producto</th>
          <th>Stock Disponible</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.name}</td>
            <td>{producto.stock}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  // Devuelve la tabla
  return tablaProductos;
};

// Página de inicio
const HomePage = () => {
  // Estado
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  // Efectos
  useEffect(() => {
    // Obtiene la lista de productos
    setProductos(getListaProductos());
  }, []);

  // Componentes
  return (
    <div className='bg-indigo-600 min-h-screen flex'>
      <Navbar />
      <Container>
        <h1 className="text-3xl font-bold mb-4">Sistema de Inventario</h1>

        {/* Encabezado */}
        <Row>
          <Col sm="6">
            <h2 className="text-xl font-semibold mb-2">Lista de Productos</h2>
          </Col>
          <Col sm="6">
            <Input
              placeholder="Buscar productos"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
        </Row>

        {/* Lista de Productos */}
        <ListaProductos productos={productos.filter((producto) =>
          producto.name.toLowerCase().includes(busqueda.toLowerCase())
        )} />
      </Container>
    </div>
  );
};

// Exportación
export default HomePage;