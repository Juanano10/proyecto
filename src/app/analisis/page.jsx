"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import Header from '../components/Header';
import Dashboard from "../components/dashboard";
import Dashboard2 from "../components/dashboard2";
import ReactPaginate from "react-paginate";

function Analisis() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Cantidad de productos por página

  const users = 3; // Número de usuarios registrados
  const totalProducts = 350; // Total de productos
  const totalValue = 1400000; // Valor total

  useEffect(() => {
    axios
      .get("/api/product/id")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de productos", error);
      });
  }, []);

  const productosConMenosStock = products
    .slice()
    .sort((a, b) => a.stock - b.stock)
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const productosConMasStock = products
    .slice()
    .sort((a, b) => b.stock - a.stock)
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white mt-4 mx-4 my-2 rounded-lg p-5 xl:w-10/12">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Análisis de Ventas</h1>
            <div className="flex flex-wrap">
              <div className="w-full md:w-8/12 p-4">
                <div className="bg-white p-4 shadow-md rounded">
                  <h2 className="text-xl font-semibold mb-2">Resumen de Ventas</h2>
                  {/* Contenido de la tabla de resumen de ventas */}
                </div>
                <Dashboard />
                <Dashboard2 /> {/* Primer Dashboard con gráfico de barras */}
              </div>
              <div className="w-full md:w-4/12 p-4">
                <div className="bg-white p-4 shadow-md rounded">
                  <h2 className="text-xl font-semibold mb-2">Productos con Menos Stock</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2">Nombre del Producto</th>
                          <th className="px-4 py-2">Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productosConMenosStock.map((item, index) => (
                          <tr key={index} className="bg-white">
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">{item.stock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-white p-4 shadow-md rounded mt-4">
                  <h2 className="text-xl font-semibold mb-2">Productos con Más Stock</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2">Nombre del Producto</th>
                          <th className="px-4 py-2">Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productosConMasStock.map((item, index) => (
                          <tr key={index} className="bg-white">
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">{item.stock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="w-full p-4 mt-4 bg-white shadow-md rounded">
                  <h2 className="text-xl font-semibold mb-2">Usuarios Registrados</h2>
                  <p>{users}</p>
                </div>
                <div className="w-full p-4 mt-4 bg-white shadow-md rounded">
                  <h2 className="text-xl font-semibold mb-2">Total de Productos</h2>
                  <p>{totalProducts}</p>
                </div>
                <div className="w-full p-4 mt-4 bg-white shadow-md rounded">
                  <h2 className="text-xl font-semibold mb-2">Valor Total</h2>
                  <p>${totalValue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Analisis;