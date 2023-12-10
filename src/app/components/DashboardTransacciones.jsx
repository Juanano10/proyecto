"use client";
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
    stock.push({ date: transactionDate.toLocaleDateString('default', { month: 'long', year: 'numeric' }), value: cumulativeStock });
  });

  return stock.reduce((acc, cur) => {
    const existingMonth = acc.find(item => item.date === cur.date);

    if (existingMonth) {
      existingMonth.value += cur.value;
    } else {
      acc.push({ date: cur.date, value: cur.value });
    }

    return acc;
  }, []);
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

        const uniqueMonths = Array.from(new Set(stockOverTime.map(item => item.date)));

        const totalStockPerMonth = uniqueMonths.map(month => {
          const filteredData = stockOverTime.filter(item => item.date === month);
          return filteredData.reduce((acc, cur) => acc + cur.value, 0);
        });

        setTransactionData({
          labels: uniqueMonths,
          datasets: [
            {
              label: 'Stock Acumulado',
              data: totalStockPerMonth,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
      const ctx = document.getElementById('stackedAreaChart').getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: transactionData,
        options: {
          scales: {
            x: {
              stacked: true,
              beginAtZero: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      });
    }
  }, [transactionData]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 border border-black">
      <h2 className="text-xl font-semibold mb-2">Stock Acumulado a lo largo del Tiempo</h2>
      <div className="line-chart">
        <canvas id="stackedAreaChart" className="w-full h-64"></canvas>
      </div>
    </div>
  );
};

export default DashboardTransacciones;
