"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import ReactPaginate from "react-paginate";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { InventoryTransactionDocument } from "../../models/InventarioTrans";

function Historial() {
  const [inventariotrans, setInventarioTrans] = useState<
    InventoryTransactionDocument[]
  >([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Cambia el número de elementos por página según tus necesidades

  useEffect(() => {
    // Realiza la solicitud de datos a la API
    axios
      .get("/api/InventoryTransaction")
      .then((response) => {
        setInventarioTrans(response.data.history);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de transacciones", error);
      });
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = inventariotrans.slice(startIndex, endIndex);
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white flex-grow mr-2 mb-1 rounded-lg p-4 mt-1 max-w-[sm]">
          <h1 className="text-3xl font-bold flex-grow text-black">Historial de Movimientos</h1>
          <div className="overflow-x-auto">
            <h2 className="text-lg sm:text-2xl font-semibold text-center text-black py-2 mb-4 border-b-2 border-black">
              Lista de movimientos de productos
            </h2>
            <div className="shadow-md overflow-hidden border rounded-lg">
              <table className="w-full border border-black">
                <thead className="bg-gray-200 border-b border-black">
                  <tr>
                    <th className="py-2 px-4 text-left">Fecha</th>
                    <th className="py-2 px-4 text-left">Codigo Producto</th>
                    <th className="py-2 px-4 text-left">Nombre Producto</th>
                    <th className="py-2 px-4 text-left">Cantidad</th>
                    <th className="py-2 px-4 text-left">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapear y mostrar los movimientos de productos */}
                  {displayedItems.map((trans) => (
                    <tr key={trans._id} className="bg-white text-black">
                      <td className="border border-black px-4 py-2 font-semibold">
                        {new Date(trans.timestamp).toLocaleDateString()}
                      </td>
                      <td className="border border-black px-4 py-2 font-semibold">
                        {trans.product && trans.product.length > 20 ? `${trans.product.substring(0, 20)}...` : trans.product}
                      </td>
                      <td className="border border-black px-4 py-2 font-semibold">
                        {trans.nameProduct && trans.nameProduct.length > 20 ? `${trans.nameProduct.substring(0, 20)}...` : trans.nameProduct}
                      </td>
                      <td className="border border-black px-4 py-2 font-semibold">{trans.stock}</td>
                      <td
                        className={`border border-black px-4 py-2 text-center font-semibold ${
                          trans.type === 'entrada' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {trans.type === 'entrada' ? (
                          <div className="flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-green-600 mr-1 transform rotate-180"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              {/* Ícono para entrada */}
                            </svg>
                            Incremento
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-red-600 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              {/* Ícono para salida */}
                            </svg>
                            Decremento
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4">
            {/* Paginación */}
            <ReactPaginate
              previousLabel={"Anterior"}
              nextLabel={"Siguiente"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(inventariotrans.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName="flex justify-center mt-4"
              pageClassName="mx-2"
              previousLinkClassName={
                "bg-white text-black p-2 rounded border border-black hover:bg-blue-500 hover:text-white transform transition-transform duration-200 ease-in-out hover:scale-105"
              }
              nextLinkClassName={
                "bg-white text-black p-2 rounded border border-black hover:bg-blue-500 hover:text-white transform transition-transform duration-200 ease-in-out hover:scale-105"
              }
              disabledClassName={"opacity-50 cursor-not-allowed"}
              pageLinkClassName={
                "bg-white text-black p-2 rounded border border-black hover:bg-blue-500 hover:text-white transform transition-transform duration-200 ease-in-out hover:scale-105"
              }
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  
  
}

export default Historial;
