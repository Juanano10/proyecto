"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FormEvent, useState } from "react";
import axios,{AxiosError} from "axios";

function RegisterPage() {
  const [error,setError] = useState();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await axios.post("/api/auth/register", {
        email: formData.get("mail"),
        password: formData.get("password"),
        name: formData.get("name"),
      });
      console.log(res);
    } catch (error) {
      console.log(error)
      if(error instanceof AxiosError){
        setError(error.response?.data.message);
      }
    }
  };
  return (
    <div className="bg-indigo-600 min-h-screen flex flex-col">
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white flex-grow  mr-2 mb-2 rounded-lg p-4 mt-6">
          <div className="container mx-auto p-4  mt-16">
            <div className="card">
              {/* Agregamos una clase "card" al div para darle forma de tarjeta */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && <div className=" bg-slate-400 border-black border-4 text-black p-2 mb-2">{error}</div>}
                <h3 className="text-2xl  text-black font-bold text-center">
                  Registrar usuario
                </h3>
                <input
                  type="text"
                  placeholder="Full name"
                  name="name"
                  className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                />
                <input
                  type="email"
                  placeholder="mail@mail.com"
                  name="mail"
                  className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                />
                <input
                  type="password"
                  placeholder="*******"
                  name="password"
                  className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                />
                <button
                  className="bg-indigo-500 text-white px-5 py-2 w-full rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
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

export default RegisterPage;
