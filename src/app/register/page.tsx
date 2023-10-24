"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";

function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as UserRoles; // Nuevo campo "role"

    if (!name.trim() || !email.trim() || !password.trim() || !role) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    try {
      const res = await axios.post("/api/usuarios/id", {
        email,
        password,
        name,
        role, // Pasamos el campo "role" al backend
      });
      console.log(res);
      setSuccessMessage("¡Registro completado con éxito!");
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
                <h3 className="text-2xl text-white font-bold text-center mb-4">
                  {" "}
                  {/* Agrega margin-bottom aquí */}
                  <u className="hover:underline hover:cursor-pointer transition duration-300 ease-in-out">
                    Registrar Usuario
                  </u>
                </h3>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                    htmlFor="name"
                  >
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre completo"
                    className="bg-white px-4 py-2 w-full text-gray-800 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                    htmlFor="email"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="bg-white px-4 py-2 w-full text-gray-800 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    className="bg-white px-4 py-2 w-full text-gray-800 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                    htmlFor="role"
                  >
                    Rol
                  </label>
                  <select
                    name="role"
                    className="bg-white px-4 py-2 w-full text-gray-800 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                  >
                    <option value="consultor">Consultor</option>
                    <option value="reponedor">Reponedor</option>
                    <option value="administrador">Administrador</option>
                  </select>
                </div>

                <div className="mb-6">
                  <button
                    className="bg-red-500 text-white px-2 py-2 w-full rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
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

export default RegisterPage;