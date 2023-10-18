"use client";
import Link from "next/link"
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [error,setError] = useState("");
  const route = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

   
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect:false,
      });
      if (res ?.error)  return setError(res.error as string)
      
      if (res ?.ok) return route.push('/home')
     console.log(res)
    };
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-700 to-purple-500 relative">
        <div className="flex items-center justify-center min-h-screen sm:flex-col">
          <div className="w-full max-w-3xl p-4 rounded-lg shadow-lg bg-opacity-80 bg-white mt-10 relative grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-opacity-70">
              <div className="mb-4 text-left text-black">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                  Inicio de Sesión
                </h2>
                <p className="text-sm sm:text-base font-bold text-center text-gray-800">
                  Ingresa tus credenciales para acceder a nuestra plataforma.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-opacity-80 bg-red-100 border border-red-500 text-red-700 p-2">
                    {error}
                  </div>
                )}
                <div className="text-center">
                  <input
                    className="bg-opacity-80 border border-gray-400 w-full sm:w-64 py-2 sm:py-3 rounded-md inline-block"
                    type="email"
                    placeholder="Correo Electrónico"
                    name="email"
                  />
                </div>
                <div className="text-center">
                  <input
                    className="bg-opacity-80 border border-gray-400 w-full sm:w-64 py-2 sm:py-3 rounded-md inline-block"
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                  />
                </div>
                <div className="text-center">
                  <button
                    className="bg-opacity-80 bg-indigo-500 text-white w-full sm:w-64 py-3 sm:py-2 rounded-md mx-auto hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700 shadow-md border border-indigo-500"
                    type="submit"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
            <div className="p-4 bg-gradient-to-b from-indigo-700 to-purple-500 relative">
              <div className="text-sm text-left text-black">
                <h2 className="text-2xl sm:text-3xl font-bold text-center relative mb-4">
                  <span className="text-purple-500">FillFast</span>
                  <span className="text-black">Technology</span>
                  <span className="absolute -bottom-5 left-0 w-full h-1 bg-indigo-400"></span>
                </h2>
                <p className="text-base sm:text-lg font-semibold text-center text-gray-1100 mb-4">
                  Potencia tu negocio con una gestión de inventario inteligente.
                  Controla tus productos y optimiza tus operaciones con nuestra
                  plataforma de gestión de inventario.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default LoginPage