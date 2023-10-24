"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DeleteBtn } from "../components/BtnUsers/DeleteBtn";
import { UpdateBtn } from "../components/BtnUsers/UpdateBtn";
import ReactPaginate from "react-paginate";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10; // Cantidad de usuarios por página

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

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * usersPerPage;

  const currentPageUsers = filteredUsers.slice(offset, offset + usersPerPage);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-blue-900 flex-grow mr-2 mb-1 rounded-lg p-4 mt-1 max-w-[sm]">
          <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
              {/* Añadimos margen inferior para mantener el espacio */}
              <h1 className="text-3xl font-bold flex-grow text-white">
                Usuarios del Sistema
              </h1>
            </div>

            {/* Búsqueda y Filtrado */}
            <div className="mb-4">
              <input
                className="border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4 w-full rounded-md placeholder-gray-400 text-gray-800 flex"
                type="text"
                placeholder="Buscar usuarios por correo"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Lista de Usuarios */}
            <div className="bg-white p-4 shadow-md rounded">
              <h2 className="text-lg sm:text-2xl font-semibold text-center text-black py-2 mb-4 border-b-2 border-black">
                Lista de Usuarios
              </h2>

              <table className="w-full border border-black">
                <thead className="bg-gray-200 border-b border-black">
                  <tr>
                    <th className="py-2 px-4 text-left">Nombre</th>
                    <th className="py-2 px-4 text-left">Correo</th>
                    <th className="py-2 px-4 text-left">Id</th>
                    <th className="py-2 px-4 text-left">Rol</th>
                    <th className="py-2 px-4 text-left">Acciones</th>
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
                        <td
                          className="border-r border-black py-2 px-4 text-center"
                          style={{ maxWidth: "100px" }}
                        >
                          <div
                            className="text-gray-900 font-semibold"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {user.name}
                          </div>
                        </td>
                        <td
                          className="border-r border-black py-2 px-4 text-center"
                          style={{ maxWidth: "100px" }}
                        >
                          <div
                            className="text-gray-900 font-semibold"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {user.email}
                          </div>
                        </td>
                        <td
                          className="border-r border-black py-2 px-4 text-center"
                          style={{ maxWidth: "100px" }}
                        >
                          <div
                            className="text-gray-900 font-semibold"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {user._id}
                          </div>
                        </td>
                        <td
                          className="border-r border-black py-2 px-4 text-center"
                          style={{ maxWidth: "100px" }}
                        >
                          <div
                            className="text-gray-900 font-semibold"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {user.role}
                          </div>
                        </td>
                        <td className="flex justify-center">
                          {" "}
                          {/* Centro horizontalmente los botones */}
                          <button className="mx-2">
                            <DeleteBtn id={user._id} />
                          </button>
                          <button className="mx-2">
                            <UpdateBtn
                              id={user._id}
                              name={user.name}
                              email={user.email}
                              role={user.role}
                              password={user.password}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="mt-4">
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center mt-4"}
                pageClassName={"mx-2"}
                previousLinkClassName={"bg-white text-black p-2 rounded border border-black hover:bg-blue-500 hover:text-white"}
                nextLinkClassName={"bg-white text-black p-2 rounded border border-black hover:bg-blue-500 hover:text-white"}
                disabledClassName={"opacity-50 cursor-not-allowed"}


                pageLinkClassName={"bg-white text-black p-2 rounded border-black hover:bg-blue-500 hover:text-white"}
              />
            </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;