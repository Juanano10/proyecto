/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSession } from "next-auth/react";

function RegisterPage() {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session?.user?.role !== "administrador") {
      toast.error("No tienes los permisos para registrar usuarios.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    if (!name.trim() || !email.trim() || !password.trim() || !role) {
      toast.error("Por favor, rellena todos los campos.");
      return;
    }

    try {
      const res = await axios.post("/api/usuarios/id", {
        email,
        password,
        name,
        role,
      });
      console.log(res);
      toast.success("¡Registro completado con éxito!");
      resetForm();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Ha ocurrido un error");
        setError(error.response?.data.message || "Ha ocurrido un error");
      }
    }
  };

  const resetForm = () => {
    if (formRef && formRef.current) {
      formRef.current.reset();
    }
    setError(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-blue-900 flex-grow mr-2 mb-1 rounded-lg p-4 mt-1 max-w-[sm]">
          <div className="container mx-auto p-1 mt-3">
            <div className="card">
              {session?.user?.role === "administrador" ? (
                <form
                  ref={formRef}
                  className="w-full max-w-md mx-auto p-6 bg-gray-800 text-white rounded shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onSubmit={handleSubmit}
                >
                  <h3 className="text-2xl text-white font-bold text-center mb-4">
                    <u className="hover:underline hover:cursor-pointer transition duration-300 ease-in-out">
                      Registrar Usuario
                    </u>
                  </h3>

                  {error && (
                    <div className="bg-red-500 text-white p-2 mb-2 rounded-md">
                      {error}
                    </div>
                  )}

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

                  <div className="mb-6 flex space-x-4">
                    <button
                      className="bg-red-500 text-white px-2 py-2 flex-grow rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
                      type="submit"
                    >
                      Registrar
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded border border-green-600 hover:border-green-400 focus:outline-none focus:shadow-outline ml-4"
                      type="button"
                      onClick={resetForm}
                    >
                      Limpiar Campos
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-red-500 text-center">
                  No tienes los permisos para registrar usuarios.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
        style={{ fontSize: '1.4rem' }}
      />
    </div>
  );
}

export default RegisterPage;
