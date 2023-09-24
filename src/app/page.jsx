import Navbar from '@/components/Navbar'

function HomePage() {
  const products = [
    { id: 1, name: 'Producto A', stock: 50 },
    { id: 2, name: 'Producto B', stock: 30 },
    { id: 3, name: 'Producto C', stock: 20 },
    // Agregar más productos según sea necesario
  ];
  return (

    <div className='bg-indigo-600 min-h-screen flex'>
    <Navbar />
    <div className='bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4'>
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
                <th>Nombre del Producto</th>
                <th>Stock Disponible</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
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

  )
}

export default HomePage