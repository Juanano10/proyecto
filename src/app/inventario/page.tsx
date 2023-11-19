/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";

function inventario() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string); // Parse price as a number
    const description = formData.get("description") as string;
    const code = parseFloat(formData.get("code") as string);
    const cost = parseFloat(formData.get("cost") as string);
    const stock = parseFloat(formData.get("stock") as string);
    const category =formData.get("category") as string;


    if (
      !name.trim() ||
      isNaN(price) ||
      isNaN(code) ||
      isNaN(stock) ||
      !description.trim()
    ) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      const response = await axios.post("/api/product/id", {
        name: name,
        price: price,
        description: description,
        code: code,
        cost: cost,
        category: category,
        stock: stock,
      });

      console.log(response);
      setSuccessMessage("¡Producto registrado con éxito!");
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
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />

        <div className="bg-blue-900 flex-grow mr-2 mb-1 rounded-lg p-4 mt-1 max-w-[sm]">
          <div className="container mx-auto p-1 mt-3">
            <div className="card">
              <form
                className="w-full max-w-md mx-auto p-6 bg-gray-800 text-white rounded shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                onSubmit={handleSubmit}
              >
                {error && (
                  <div className="bg-slate-400 border-black border-4 text-black p-2 mb-2">
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="bg-green-400 border-green-700 border-4 text-black p-2 mb-2">
                    {successMessage}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-center mb-6">
                  <u className="hover:underline hover:cursor-pointer transition duration-300 ease-in-out">
                    Registrar Producto
                  </u>
                </h3>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                    htmlFor="name"
                  >
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre del Producto"
                    className="w-full px-4 py-2 rounded border border-gray-800 text-gray-800 focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                    htmlFor="name"
                  >
                    Categoria del Producto
                  </label>
                  <select
  id="category"
  name="category"
  className="w-full px-4 py-2 rounded border border-gray-800 text-gray-800 focus:outline-none focus:shadow-outline"
>
  <option value="" disabled selected>
    Selecciona una categoría
  </option>
  <option value="zapatillas">Zapatillas</option>
  <option value="camisetas">Camisetas</option>
  <option value="pantalones">Pantalones</option>
  <option value="accesorios">Accesorios</option>
  {/* Agrega más opciones según sea necesario */}
</select>

                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                    htmlFor="price"
                  >
                    Precio
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Precio"
                    className="w-full px-4 py-2 rounded border border-gray-800 text-gray-800 focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                    htmlFor="price"
                  >
                    Costo
                  </label>
                  <input
                    type="number"
                    id="cost"
                    name="cost"
                    placeholder="Costo"
                    className="w-full px-4 py-2 rounded border border-gray-800 text-gray-800 focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                    htmlFor="description"
                  >
                    Descripción
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Descripción"
                    className="w-full px-4 py-2 rounded border border-gray-800 text-gray-800 focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                    htmlFor="code"
                  >
                    Nombre del código
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="Nombre del código"
                    className="w-full px-4 py-2 rounded border border-gray-800 text-gray-800 focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                    htmlFor="stock"
                  >
                    Cantidad de stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Cantidad de stock"
                    className="w-full px-4 py-2 rounded border border-gray-800 text-gray-800 focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-6">
                  <button
                    className="bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded border border-red-600 hover:border-red-400 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Registrar
                  </button>
                </div>
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
