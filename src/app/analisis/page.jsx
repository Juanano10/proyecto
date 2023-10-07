import Navbar from './../components/Navbar';
import Footer from './../components/Footer';

function analisis() {
  const sampleData = [
    { productName: 'Producto A', sold: 120, returns: 5 },
    { productName: 'Producto B', sold: 80, returns: 2 },
    { productName: 'Producto C', sold: 150, returns: 10 },
    // ... añadir más datos de ejemplo
  ];

  return (
    <div className="bg-indigo-600 min-h-screen flex flex-col">
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Análisis de Ventas</h1>

            <div className="bg-white p-4 shadow-md rounded">
              <h2 className="text-xl font-semibold mb-2">Resumen de Ventas</h2>
              <table className="min-w-full border-collapse border border-gray-300 mt-4">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Producto</th>
                    <th className="border border-gray-300 p-2">Unidades Vendidas</th>
                    <th className="border border-gray-300 p-2">Devoluciones</th>
                    <th className="border border-gray-300 p-2">Neto Vendido</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{item.productName}</td>
                      <td className="border border-gray-300 p-2">{item.sold}</td>
                      <td className="border border-gray-300 p-2">{item.returns}</td>
                      <td className="border border-gray-300 p-2">{item.sold - item.returns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Aquí puedes agregar gráficos o cualquier otro análisis adicional */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default analisis;


