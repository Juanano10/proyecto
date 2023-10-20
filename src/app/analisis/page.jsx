"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import Header from '../components/Header';
import Dashboard from "../components/dashboard";

function analisis() {
  const [products, setProducts] = useState([]);

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

  const productosConMenosStock = products.slice().sort((a, b) => a.stock - b.stock).slice(0, 5);
  const productosConMasStock = products.slice().sort((a, b) => b.stock - a.stock).slice(0, 5);

  return (
    <div className="bg-indigo-600 min-h-screen flex flex-col">
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
                <div><Dashboard /></div>
                <div>
                  {productosConMenosStock.map((item, index) => (
                    <div key={index} className="bg-white p-4 shadow-md rounded mt-4">
                      <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                      <p>{item.stock}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-4/12 p-4">
                <div className="bg-white p-4 shadow-md rounded">
                  <h2 className="text-xl font-semibold mb-2">Productos con Menos Stock</h2>
                  <div className="overflow-x-auto">
                    {/* ... (código de la tabla para productos con menos stock) */}
                  </div>
                </div>
                <div className="bg-white p-4 shadow-md rounded mt-4">
                  <h2 className="text-xl font-semibold mb-2">Productos con Más Stock</h2>
                  <div className="overflow-x-auto">
                    {/* ... (código de la tabla para productos con más stock) */}
                  </div>
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

export default analisis;
