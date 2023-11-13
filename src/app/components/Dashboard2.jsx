import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Dashboard2 = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener datos de los productos
    axios.get("/api/product/id")
      .then(response => {
        const productNames = response.data.products.map(p => p.name);
        const productStocks = response.data.products.map(p => p.stock);

        setProductData({
          labels: productNames,
          datasets: [
            {
              label: 'Stock de productos',
              data: productStocks,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => {
        console.error("Error al obtener la lista de productos", error);
      });
  }, []);

  useEffect(() => {
    if (productData.labels && productData.labels.length > 0) {
      const ctx = document.getElementById('pieChart').getContext('2d');

      // Destruye el gráfico anterior si existe
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      // Crea un nuevo gráfico de torta con los datos obtenidos
      new Chart(ctx, {
        type: 'pie',
        data: productData,
      });
    }
  }, [productData]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-2">Resumen de Stock</h2>

      <div className="flex">
        <div className="pie-chart w-2/3">
          <canvas id="pieChart" className="w-full h-32"></canvas>
        </div>
        <div className="timeline w-1/3">
          {/* Agrega aquí tu componente de serie de tiempo */}
          {/* Por ejemplo: <TimelineComponent /> */}
        </div>
      </div>
    </div>
  );
};


export default Dashboard2;
