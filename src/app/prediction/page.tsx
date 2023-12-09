"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Prediction {
  type: number;
  nameProduct: string;
  stock_x: number;
  predicted_stock: number;
}

function PredictionPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    // Realizar la solicitud GET a la API Flask
    axios.get('http://localhost:5000/predict')
      .then(response => {
        // Al recibir los datos, actualizar el estado
        setPredictions(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de la API Flask:', error);
      });
  }, []);

  return (
    <div>
      <h1>Predictions</h1>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Predicted Stock</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map(prediction => (
            <tr key={prediction.nameProduct}>
              <td>{prediction.type}</td>
              <td>{prediction.nameProduct}</td>
              <td>{prediction.stock_x}</td>
              <td>{prediction.predicted_stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PredictionPage;
