import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
function historial() {
  const movements = [
    { id: 1, date: '2023-09-25', description: 'Venta', product: 'Producto A', quantity: 5, type: 'Decremento' },
    { id: 2, date: '2023-09-24', description: 'Compra', product: 'Producto B', quantity: 10, type: 'Incremento' },
    { id: 3, date: '2023-09-23', description: 'Venta', product: 'Producto C', quantity: 8, type: 'Decremento' },
    { id: 4, date: '2023-09-22', description: 'Compra', product: 'Producto A', quantity: 15, type: 'Incremento' },
    { id: 5, date: '2023-09-21', description: 'Venta', product: 'Producto B', quantity: 7, type: 'Decremento' },
    // Agregar más movimientos según sea necesario
  ];

  return (
    <div className="bg-indigo-600 min-h-screen flex flex-col">
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Historial de Movimientos</h1>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Fecha</th>
                    <th className="border px-4 py-2">Descripción</th>
                    <th className="border px-4 py-2">Producto</th>
                    <th className="border px-4 py-2">Cantidad</th>
                    <th className="border px-4 py-2">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.map((movement) => (
                    <tr key={movement.id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{movement.date}</td>
                      <td className="border px-4 py-2">{movement.description}</td>
                      <td className="border px-4 py-2">{movement.product}</td>
                      <td className="border px-4 py-2">{movement.quantity}</td>
                      <td className={`border px-4 py-2 ${movement.type === 'Incremento' ? 'text-green-600' : 'text-red-600'}`}>
                        {movement.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default historial;
