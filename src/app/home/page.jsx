"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "src/app/components/Navbar";
import Footer from "./../components/Footer";
import ReportGenerator from "../components/pdf";
import Papa from "papaparse";

function HomePage() {
  const transactions = [
    {
      id: 1,
      date: "2023-09-25",
      description: "Venta",
      product: "Producto A",
      quantity: 5,
      type: "Decremento",
    },
    {
      id: 2,
      date: "2023-09-24",
      description: "Compra",
      product: "Producto B",
      quantity: 10,
      type: "Incremento",
    },
  ];

  const [csvData, setCsvData] = useState([]);
  const [showCsvData, setShowCsvData] = useState(true); // Estado para controlar la visibilidad del CSV

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data);
        },
        header: true, // Indica si el archivo CSV tiene encabezados
      });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Sistema de Inventario</h1>
            {/* Búsqueda y Filtrado */}
            <div className="mb-4">
              <input
                className="border border-gray-400 py-2 px-4 w-full rounded-md"
                type="text"
                placeholder="Buscar productos"
              />
            </div>

            {/* Lista de Productos con Búsqueda y Filtrado */}
            <div className="bg-white p-4 shadow-md rounded">
              <h2 className="text-xl font-semibold mb-2">Lista de Productos</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Stock Disponible</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapea y muestra las transacciones */}
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.product}</td>
                      <td>{transaction.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Control de Stock */}
            <div className="bg-white p-4 shadow-md rounded mt-4">
              <h2 className="text-xl font-semibold mb-2">Control de Stock</h2>
              {/* Aquí puedes agregar controles para ajustar el stock de productos */}
            </div>

            {/* Generación de Informes */}
            <div className="bg-white p-4 shadow-md rounded mt-4">
              <h2 className="text-xl font-semibold mb-2">Generación de Informes</h2>
              {/* Aquí puedes incluir opciones para generar informes */}
            </div>
            
            <div className="p-1 border flex items-center justify-center bg-indigo-400 rounded-md cursor-pointer hover:bg-indigo-500">
              <ReportGenerator />
            </div>

            {/* Agrega el componente CsvUploader */}
            <div className="bg-white p-4 shadow-md rounded mt-4">
              <h2 className="text-xl font-semibold mb-2">Subir Archivo CSV</h2>
              <div className="flex items-center justify-between">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="border border-gray-400 py-2 px-4 w-full rounded-md mr-2"
                />
                <button
                  onClick={() => setShowCsvData(!showCsvData)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {showCsvData ? "Ocultar CSV" : "Mostrar CSV"}
                </button>
              </div>
              <div className="mt-4">
                {/* Mostrar datos del CSV si es necesario y si la casilla está marcada */}
                {csvData.length > 0 && showCsvData && (
                  <table className="w-full">
                    <thead>
                      <tr>
                        {Object.keys(csvData[0]).map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((value, index) => (
                            <td key={index}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;