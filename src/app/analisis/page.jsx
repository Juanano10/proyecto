"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import Header from '../components/Header';
import Dashboard from "../components/dashboard";
import Dashboard2 from "../components/dashboard2";
import PredictedStockDashboard from "../components/PredictedStockDashboard";
import DashboardTransacciones from "../components/DashboardTransacciones";
import { FaShoppingCart, FaDollarSign, FaChartLine } from 'react-icons/fa';


function Analisis() {
  const [products, setProducts] = useState([]);
  const [predictedStock, setPredictedStock] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const totalStock = products.reduce((total, product) => total + parseFloat(product.stock) || 0, 0);
  const totalPrice = products.reduce((total, product) => total + parseFloat(product.price) || 0, 0);
  const totalCost = products.reduce((total, product) => total + parseFloat(product.cost) || 0, 0);
  const totalProfit = totalPrice - totalCost;

  useEffect(() => {
    // Obtiene datos de la API de productos
    axios
      .get("/api/product/id")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de productos", error);
      });

    // Obtiene datos de la API de predicción
    axios
      .get('http://localhost:5000/predict')
      .then((response) => {
        setPredictedStock(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de predicción", error);
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
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="flex-grow bg-white rounded-lg p-4 mt-1 mr-2 mb-1 text-black max-w-[sm] mx-auto">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-black">Análisis de Ventas</h1>
            <div className="p-4 flex justify-between items-center bg-white mb-4">
              <div className="w-1/3 border border-black border-r-0 rounded-l-lg p-4 flex items-center">
                <FaShoppingCart className="mr-3 text-4xl border-black border rounded-full p-2" />
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-black">Total de Productos</h2>
                  <p className="text-black">{totalStock}</p>
                </div>
              </div>
              <div className="w-1/3 border border-black border-r-0 p-4 flex items-center">
                <FaDollarSign className="mr-3 text-4xl border-black border rounded-full p-2" />
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-black">Valor Total</h2>
                  <p className="text-black">${totalCost}</p>
                </div>
              </div>
              <div className="w-1/3 border border-black rounded-r-lg p-4 flex items-center">
                <FaChartLine className="mr-3 text-4xl border-black border rounded-full p-2" />
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-black">Ganancia total</h2>
                  <p className="text-black">${totalProfit}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full md:w-8/12 p-4">
                  <Dashboard2 />
                  <DashboardTransacciones />
                </div>
                <div className="w-full md:w-4/12 p-4">
                <Dashboard />
  <div className="bg-white p-4 shadow-md rounded border-black border mb-4">
    <h2 className="text-xl font-semibold mb-2">Productos con Menos Stock</h2>
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Nombre del Producto</th>
            <th className="px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody className="border-black">
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
  <div className="bg-white p-4 shadow-md rounded border-black border">
    <h2 className="text-xl font-semibold mb-2">Productos con Más Stock</h2>
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Nombre del Producto</th>
            <th className="px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody className="border-black">
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
</div>

            </div>
            <div className="flex flex-wrap"><PredictedStockDashboard predictedStock={predictedStock} /></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Analisis;
