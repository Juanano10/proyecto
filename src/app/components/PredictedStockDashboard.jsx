import React from "react";

const PredictedStockDashboard = ({ predictedStock }) => {
  // Organiza las predicciones por producto
  const predictionsByProduct = {};

  predictedStock.forEach((item) => {
    if (!predictionsByProduct[item.name]) {
      predictionsByProduct[item.name] = item;
    } else {
      // Puedes decidir cómo manejar múltiples predicciones para el mismo producto
      // En este ejemplo, simplemente estoy sumando las predicciones
      predictionsByProduct[item.name].predicted_stock += item.predicted_stock;
    }
  });

  const uniquePredictions = Object.values(predictionsByProduct);

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
            {uniquePredictions.map((item) => (
              <tr key={item._id_x} className="bg-white">
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