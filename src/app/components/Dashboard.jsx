"use client"
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  useEffect(() => {
    // Datos para el gráfico de barras (puedes personalizarlos)
    const barChartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [
        {
          label: 'Ventas',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de las barras
          borderColor: 'rgba(75, 192, 192, 1)', // Borde de las barras
          borderWidth: 1,
        },
      ],
    };

    const ctx = document.getElementById('barChart').getContext('2d');

    // Destruye el gráfico anterior si existe
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    // Crea un nuevo gráfico de barras
    new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

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