import React from "react";

const PredictedStockDashboard = ({ predictedStock }) => {
  console.log(predictedStock); // Agrega este console.log para visualizar la estructura en la consola

  return (
    <div className="bg-white p-4 shadow-md rounded mt-4">
      <h2 className="text-xl font-semibold mb-2">Predicciones de Stock</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Nombre del Producto</th>
              <th className="px-4 py-2"> Stock</th>
              <th className="px-4 py-2">Predicción de Stock</th>
            </tr>
          </thead>
          <tbody>
            {predictedStock.map((item) => (
              <tr key={item._id_x} className="bg-white">
                {/* Agrega mensajes de consola para verificar la estructura real */}
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.stock_x}</td>
                <td className="px-4 py-2">{Math.round(item.predicted_stock)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PredictedStockDashboard;
