"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UpdateBtn } from "../components/BtnProduct/UpdateBtn";
import Link from "next/link";


function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Realiza una solicitud GET a tu punto final de la API para obtener la lista de usuarios
    axios
      .get("/api/product/id")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de usuarios", error);
      });
  }, []);

  return (
    <div className="bg-indigo-600 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="mb-4"></div>
        <div className="mb-4"></div>
        <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            
            <div className="flex items-center justify-between mb-4"> 
              {/* Añadimos margen inferior para mantener el espacio */}
              <h1 className="text-3xl font-bold flex-grow">Sistema de Inventario</h1>
  
              <Link href="/inventario">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </Link>
            </div>
  
            {/* Búsqueda y Filtrado */}
            <div className="mb-4">
              <input
                className="border border-gray-400 py-2 px-4 w-full rounded-md"
                type="text"
                placeholder="Buscar usuarios por correo"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
  
            <div className="bg-white p-4 shadow-md rounded">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Lista de Productos
              </h2>
  
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripcion</th>
                    <th>Codigo</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products
                    .filter((product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                    .map((product) => (
                      <tr key={product._id}>
                        <td className="text-center">{product.name}</td>
                        <td className="text-center">{product.price}</td>
                        <td className="text-center">{product.description}</td>
                        <td className="text-center">{product.code}</td>
                        <td className="text-center">{product.stock}</td>
                        <td className="flex justify-center">
                          <button className="mx-2"></button>
                          <button className="mx-2">
                            <UpdateBtn id={product._id}
                            name={product.name}
                            email={product.price}
                            role={product.description}
                            password={product.code}
                            password={product.stock}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  
}

export default HomePage;