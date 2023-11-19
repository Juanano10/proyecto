import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Dashboard = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener datos de los productos
    axios.get("/api/product/id")
      .then(response => {
        const products = response.data.products;

        // Crear un objeto para almacenar el stock por categoría de producto
        const stockByCategory = {};
        products.forEach(product => {
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
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
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
      const ctx = document.getElementById('barChart').getContext('2d');

      // Destruye el gráfico anterior si existe
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      // Crea un nuevo gráfico de barras con los datos obtenidos
      new Chart(ctx, {
        type: 'bar',
        data: productData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [productData]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-4">Resumen de Stock por Categoría de Producto</h2>

      <div className="bar-chart">
        <canvas id="barChart" className="w-full h-64"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
