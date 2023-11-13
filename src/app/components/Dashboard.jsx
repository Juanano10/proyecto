"use client"
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Dashboard = () => {
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
    <div>
      {/* Métricas estáticas /}
      <div className="metrics">
        <div className="metric">
          <h2>Total de Ventas</h2>
          <p>350</p>
        </div>
        <div className="metric">
          <h2>Usuarios Registrados</h2>
          <p>1200</p>
        </div>
        <div className="metric">
          <h2>Ingresos Mensuales</h2>
          <p>$15,000</p>
        </div>
      </div>

      {/ Gráfico de barras */}
      <div className="bar-chart">
        <canvas id="barChart"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;