
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';


function inventario() {
  const movements = [
    { id: 1, date: '2023-09-25', description: 'Venta', product: 'Producto A', quantity: 5, type: 'Decremento' },
    { id: 2, date: '2023-09-24', description: 'Compra', product: 'Producto B', quantity: 10, type: 'Incremento' },
    // Agregar más movimientos según sea necesario
  ];

  return (
    <div className="bg-indigo-600 min-h-screen flex flex-col">
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Sistema de Inventario</h1>

            {/* Búsqueda y Filtrado */}
            <div className="mb-4">
              <input
                className="border border-gray-400 py-2 px-4 w-full rounded-md"
                type="text"
                placeholder="Buscar productos"
              />
            </div>

            {/* Lista de Productos con Búsqueda y Filtrado */}
            <div className="bg-white p-4 shadow-md rounded">
              <h2 className="text-xl font-semibold mb-2">Lista de Productos</h2>
              {/* Aquí puedes mostrar la lista de productos con capacidades de búsqueda y filtrado */}
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Stock Disponible</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.map((movement) => (
                    <tr key={movement.id}>
                      <td>{movement.product}</td>
                      <td>{movement.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Control de Stock */}
            <div className="bg-white p-4 shadow-md rounded mt-4">
              <h2 className="text-xl font-semibold mb-2">Control de Stock</h2>
              {/* Aquí puedes agregar controles para ajustar el stock de productos */}
            </div>

            {/* Generación de Informes */}
            <div className="bg-white p-4 shadow-md rounded mt-4">
              <h2 className="text-xl font-semibold mb-2">Generación de Informes</h2>
              {/* Aquí puedes incluir opciones para generar informes */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default inventario;
