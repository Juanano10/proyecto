"use client";
import React, { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header from "../components/Header";

function inventario() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string); // Parse price as a number
    const description = formData.get('description') as string;
    const code = parseFloat(formData.get('code') as string);
    const stock = parseFloat(formData.get('stock') as string);
    

    if (!name.trim() || isNaN(price) || isNaN(code)|| isNaN(stock)|| !description.trim()) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }

    try {
      const response = await axios.post('/api/product/id', {
        name: name,
        price: price,
        description: description,
        code:code,
        stock:stock,
      });

      console.log(response);
      setSuccessMessage('¡Producto registrado con éxito!');
      setError(null);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
      setSuccessMessage(null);
    }
  };

  return (
    <div className="bg-indigo-600 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white flex-grow mr-2 mb-2 rounded-lg p-4 mt-6">
          <div className="container mx-auto p-4 mt-16">
            <div className="card">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && <div className="bg-slate-400 border-black border-4 text-black p-2 mb-2">{error}</div>}
                {successMessage && <div className="bg-green-400 border-green-700 border-4 text-black p-2 mb-2">{successMessage}</div>}
                <h3 className="text-2xl text-black font-bold text-center">
                  Registrar Producto
                </h3>
                <input
                  type="text"
                  placeholder="Nombre del Producto"
                  name="name"
                  className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                />
                <input
                  type="number"
                  placeholder="Precio"
                  name="price"
                  className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Descripción"
                  name="description"
                  className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Nombre del codigo"
                  name="code"
                  className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                />
                <input
                  type="number"
                  placeholder="cantidad de stock"
                  name="stock"
                  className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                />
                <button
                  className="bg-indigo-500 text-white px-5 py-2 w-full rounded-md hover-bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
                  type="submit"
                >
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default inventario;
