import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Dashboard = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener datos de los productos
    axios
      .get("/api/product/id")
      .then((response) => {
        const products = response.data.products;

        // Crear un objeto para almacenar el stock por categoría de producto
        const stockByCategory = {};
        products.forEach((product) => {
          const { category, stock } = product;
          if (!stockByCategory[category]) {
            stockByCategory[category] = 0;
          }
          stockByCategory[category] += stock;
        });

        // Obtener etiquetas (nombres de categorías) y datos (stock por categoría)
        const labels = Object.keys(stockByCategory);
        const data = Object.values(stockByCategory);

        setProductData({
          labels: labels,
          datasets: [
            {
              label: 'Stock por Categoría de Producto',
              data: data,
              backgroundColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error al obtener la lista de productos", error);
      });
  }, []);

  useEffect(() => {
    if (productData.labels && productData.labels.length > 0) {
      const ctx = document.getElementById('donutChart');
      if (ctx) {
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
          existingChart.destroy();
        }

        // Crea un nuevo gráfico de donut con los datos obtenidos
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: productData.labels,
            datasets: [
              {
                label: 'Stock por Categoría de Producto',
                data: productData.datasets[0].data,
                backgroundColor: productData.datasets[0].backgroundColor,
                borderColor: productData.datasets[0].borderColor,
                borderWidth: productData.datasets[0].borderWidth,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          },
        });
      }
    }
  }, [productData]);

  return (
    <div className="border-black border p-4 rounded-lg shadow-md mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h2 className="text-2xl font-semibold mb-4">Resumen de Stock por Categoría de Producto</h2>
  
      <div className="donut-chart" style={{ maxWidth: '400px' }}>
        <canvas id="donutChart" className="w-full" style={{ height: '300px' }}></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
