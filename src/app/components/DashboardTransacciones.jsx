// DashboardTransacciones.jsx
"use client";
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const calculateStockOverTime = (transactions) => {
  if (!Array.isArray(transactions)) {
    console.warn("La respuesta de la API de transacciones no es un array.");
    return { dates: [], stock: [] };
  }

  let cumulativeStock = 0;
  const dates = [];
  const stock = [];

  transactions.forEach(transaction => {
    // Convierte la cadena de fecha a un objeto Date
    const transactionDate = new Date(transaction.timestamp);

    dates.push(transactionDate);
    cumulativeStock += (transaction.type === 'entrada' ? 1 : -1) * parseFloat(transaction.stock);
    stock.push(cumulativeStock);
  });

  return { dates, stock };
};

const transformData = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  // Si el objeto tiene una propiedad 'history', asumimos que contiene las transacciones
  if (data.history && Array.isArray(data.history)) {
    return data.history;
  }

  return [];
};

const DashboardTransacciones = () => {
  const [transactionData, setTransactionData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    axios.get("/api/InventoryTransaction")
      .then(response => {
        const transactions = transformData(response.data);

        const stockOverTime = calculateStockOverTime(transactions);

        setTransactionData({
          labels: stockOverTime.dates,
          datasets: [
            {
              label: 'Stock Acumulado',
              data: stockOverTime.stock,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
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
      const ctx = document.getElementById('lineChart').getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: transactionData,
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
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
      <h2 className="text-xl font-semibold mb-2">Stock Acumulado a lo largo del Tiempo</h2>
      <div className="line-chart">
        <canvas id="lineChart" className="w-full h-64"></canvas>
      </div>
    </div>
  );
};

export default DashboardTransacciones;
