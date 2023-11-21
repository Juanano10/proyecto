"use client";
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Dashboard2 = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener datos de las transacciones
    axios.get("api/InventoryTransaction")
      .then(response => {
        const transactions = response.data.history;

        // Agrupa las transacciones por mes
        const transactionsByMonth = transactions.reduce((acc, transaction) => {
          const monthYear = new Date(transaction.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
          if (!acc[monthYear]) {
            acc[monthYear] = 0;
          }
          acc[monthYear] += 1;
          return acc;
        }, {});

        // Obtén etiquetas (nombres de meses) y datos (cantidad de transacciones por mes)
        const labels = Object.keys(transactionsByMonth);
        const data = Object.values(transactionsByMonth);

        setTransactionData({
          labels: labels,
          datasets: [
            {
              label: 'Transacciones de Inventario por Mes',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => {
        console.error("Error fetching inventory transaction data", error);
      });
  }, []);

  useEffect(() => {
    if (transactionData.labels && transactionData.labels.length > 0) {
      const ctx = document.getElementById('barChart2').getContext('2d');

      // Destruye el gráfico anterior si existe
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      // Crea un nuevo gráfico de barras con los datos obtenidos
      new Chart(ctx, {
        type: 'bar',
        data: transactionData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [transactionData]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-2">Resumen de Transacciones de Inventario por Mes</h2>

      <div className="bar-chart">
        <canvas id="barChart2" className="w-full h-32"></canvas>
      </div>
    </div>
  );
};

export default Dashboard2;
