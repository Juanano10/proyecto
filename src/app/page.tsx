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
    <div className="min-h-screen flex items-center justify-center bg-slate-500">
      <div className="bg-zinc-700 rounded-md p-10 w-96">
        <form  onSubmit={handleSubmit} className="space-y-4">
        {error && <div className=" bg-slate-400 border-black border-4 text-black p-2 mb-2">{error}</div>}
          <h3 className="text-2xl font-bold text-white text-center">Inicio de Sesión</h3>
          <div>

          </div>
          <div>
            <input
              className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              type="email"
              placeholder="Correo Electrónico"
              name="email"
            />
          </div>
          <div>
            <input
              className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              type="password"
              placeholder="Contraseña"
              name="password"
            />
          </div>
          <div>
            <button
              className="bg-indigo-500 text-white px-5 py-2 w-full rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default LoginPage