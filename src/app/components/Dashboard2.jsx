
"use client";
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Dashboard2 = () => {
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    axios
      .get("api/InventoryTransaction")
      .then(response => {
        const transactions = response.data.history;

        // Agrupar transacciones por mes
        const transactionsByMonth = transactions.reduce((acc, transaction) => {
          const monthYear = new Date(transaction.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
          if (!acc[monthYear]) {
            acc[monthYear] = 0;
          }
          acc[monthYear] += 1;
          return acc;
        }, {});

        const monthsInSpanishOrder = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];

        const labels = Object.keys(transactionsByMonth)
          .sort((a, b) => {
            const monthA = monthsInSpanishOrder.indexOf(a.toLowerCase().split(' ')[0]);
            const monthB = monthsInSpanishOrder.indexOf(b.toLowerCase().split(' ')[0]);
            return monthA - monthB;
          });

        const data = labels.map(label => transactionsByMonth[label]);

        setTransactionData({
          labels: labels,
          datasets: [
            {
              label: 'Transacciones de Inventario por Mes',
              data: data,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        });
      })
      .catch(error => {
        console.error("Error fetching inventory transaction data", error);
      });
  }, []);

  const annotationOptions = {
    annotations: {
      rightTop: {
        drawTime: 'afterDatasetsDraw',
        y: (ctx) => {
          const meta = ctx.chart.getDatasetMeta(0);
          const last = meta.data.length - 1;
          return meta.data[last].y - 10;
        },
        font: {
          size: 12,
          weight: 'bold',
        },
        color: 'black',
        content: 'Cantidad de datos',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 border-black border">
      <h2 className="text-xl font-semibold mb-2">Resumen de Transacciones de Inventario por Mes</h2>

      <div className="line-chart">
        {transactionData ? (
          <Line
            data={transactionData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: 'rgba(0,0,0,0.6)',
                    font: {
                      size: 10,
                    },
                  },
                },
                x: {
                  ticks: {
                    color: 'rgba(0,0,0,0.6)',
                    font: {
                      size: 10,
                    },
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `Cantidad: ${context.parsed.y}`,
                  },
                },
                legend: {
                  display: true,
                  position: 'bottom',
                  labels: {
                    boxWidth: 20,
                    usePointStyle: true,
                  },
                },
              },
              ...annotationOptions,
            }}
          />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard2;
