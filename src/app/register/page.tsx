/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <div className="flex-grow bg-blue-900 rounded-lg p-4 mt-1 mr-2 mb-1 text-white max-w-[sm] mx-auto">
          {session?.user?.role === "administrador" ? (
            <form
              ref={formRef}
              className="w-full max-w-lg mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg"
              onSubmit={handleSubmit}
              style={{ marginTop: '70px', marginBottom: '70px' }}
            >
              <h3 className="text-2xl font-bold text-center mb-6">
                <u className="hover:underline cursor-pointer">
                  Registrar Usuario
                </u>
              </h3>
  
              {error && (
                <div className="bg-red-500 text-white p-2 mb-4 rounded-md text-center">
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

      <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
                type="submit"
              >
                Registrar
              </button>
              <button
                className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded border border-green-600 hover:border-green-400 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={resetForm}
              >
                Limpiar Campos
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-grow flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-12 max-w-3xl">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Acceso Denegado
              </h2>
              <p className="text-gray-700 text-center">
                Lo sentimos, no tienes los permisos necesarios para realizar esta acción.
              </p>
            </div>
          </div>
        )}
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
