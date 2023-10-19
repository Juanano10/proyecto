"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DeleteBtn } from "../components/DeleteBtn";
import { UpdateBtn } from "../components/UpdateBtn";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Realiza una solicitud GET a tu punto final de la API para obtener la lista de usuarios
    axios
      .get("/api/usuarios/id")
      .then((response) => {
        setUsers(response.data.users);
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
        <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Sistema de Inventario</h1>
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

            {/* Lista de Usuarios */}
            <div className="bg-white p-4 shadow-md rounded">
              <h2 className="text-xl font-semibold mb-2 text-center">Lista de Usuarios</h2>
              
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((user) =>
                      user.email
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                    .map((user) => (
                      <tr key={user._id}>
                        <td className="text-center">{user.name}</td>
                        <td className="text-center">{user.email}</td>
                        <td className="text-center">{user.role}</td>
                        <td className="flex justify-center">
                          {" "}
                          {/* Centro horizontalmente los botones */}
                          <button className="mx-2">
                           <DeleteBtn />
                          </button>
                          <button className="mx-2">
                            <UpdateBtn />
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
