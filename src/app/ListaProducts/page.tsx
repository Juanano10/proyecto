"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UpdateBtn } from "../components/BtnProduct/UpdateBtn";
import Link from "next/link";
import ReactPaginate from "react-paginate";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/product/id");
        setProducts(response.data.products);

        // Simular una carga de 2 segundos
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error al obtener la lista de productos", error);
      }
    };

    fetchData();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    offset,
    offset + productsPerPage
  );

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="mb-4"></div>
        <div className="mb-4"></div>
        <div className="bg-white flex-grow mr-2 mb-1 rounded-lg p-4 mt-1 max-w-[sm]">
          <div className="container mx-auto p-1 mt-3">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold flex-grow text-black">
                Sistema de Inventario
              </h1>
              <Link href="/inventario">
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex">
                  Agregar Productos
                </button>
              </Link>
            </div>
            <div className="mb-4">
              <input
                className="border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4 w-full rounded-md placeholder-gray-400 text-gray-800 flex"
                type="text"
                placeholder="Buscar producto"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="bg-white p-4 shadow-md rounded">
              <h2 className="text-lg sm:text-2xl font-semibold text-center text-black py-2 mb-4 border-b-2 border-black">
                Lista de Productos
              </h2>

              {loading ? (
                <div className="flex justify-center items-center h-4/5">
                  <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-4/5 h-4/5 flex flex-col items-center mx-auto my-auto">
                    <ReactLoading
                      type={"spin"}
                      color={"#3182ce"}
                      height={200}
                      width={200}
                    />
                    <p className="mt-4 text-black-800 text-lg font-bold animate-pulse">
                      Cargando productos
                    </p>
                  </div>
                </div>
              ) : (

                // Tu contenido cuando no está cargando

                <table className="w-full border border-black">
                  <thead className="bg-gray-200 border-b border-black">
                    <tr>
                      <th className="py-2 px-4 text-left">Nombre</th>
                      <th className="py-2 px-4 text-left">Categoria</th>
                      <th className="py-2 px-4 text-center">Precio</th>
                      <th className="py-2 px-4 text-center">Costo</th>
                      <th className="py-2 px-4 text-left">Descripción</th>
                      <th className="py-2 px-4 text-center">Código</th>
                      <th className="py-2 px-4 text-center">Stock</th>
                      <th className="py-2 px-4 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product) => (
                      <tr key={product._id}>
                        <td className="border-r border-black py-2 px-4 text-left">
                          <div
                            className="text-gray-900 font-semibold"
                            style={{
                              maxWidth: "150px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.name}
                          </div>
                        </td>
                        <td className="border-r border-black py-2 px-4 text-left">
                          <div
                            className="text-gray-900 font-semibold"
                            style={{
                              maxWidth: "100px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.category}
                          </div>
                          </td>
                        <td className="border-r border-black py-2 px-4 text-left">
                          <div
                            className="text-gray-900 font-semibold"
                            style={{
                              maxWidth: "100px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.price}
                          </div>
                          </td>
                          
                        <td className="border-r border-black py-2 px-4 text-left">
                          <div
                            className="text-gray-900 font-semibold"
                            style={{
                              maxWidth: "100px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.cost}
                          </div>
                        </td>
                        <td className="border-r border-black py-2 px-4 text-left">
                          <div
                            className="text-gray-900 font-semibold"
                            style={{
                              maxWidth: "200px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.description}
                          </div>
                        </td>
                        <td className="border-r border-black py-2 px-4 text-left">
                          <div
                            className="text-gray-900 font-semibold"
                            style={{
                              maxWidth: "100px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.code}
                          </div>
                        </td>
                        <td className="border-r border-black py-2 px-4 text-left">
                          <div
                            className="text-gray-900 font-semibold"
                            style={{
                              maxWidth: "100px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.stock}
                          </div>
                        </td>
                        <td className="flex justify-center">
                          <button className="mx-2"></button>
                          <button className="mx-2">
                            <UpdateBtn
                              id={product._id}
                              name={product.name}
                              email={product.price}
                              role={product.description}
                              password={product.code}
                              password={product.stock}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="mt-4">
                <ReactPaginate
                  previousLabel={"Anterior"}
                  nextLabel={"Siguiente"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(
                    filteredProducts.length / productsPerPage
                  )}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"flex justify-center mt-4"}
                  pageClassName={"mx-2"}
                  previousLinkClassName={
                    "bg-white text-black p-2 rounded border border-black hover:bg-blue-500 hover:text-white transform transition-transform duration-200 ease-in-out hover:scale-105"
                  }
                  nextLinkClassName={
                    "bg-white text-black p-2 rounded border border-black hover:bg-blue-500 hover:text-white transform transition-transform duration-200 ease-in-out hover:scale-105"
                  }
                  disabledClassName={"opacity-50 cursor-not-allowed"}
                  pageLinkClassName={
                    "bg-white text-black p-2 rounded border-black hover:bg-blue-500 hover:text-white transform transition-transform duration-200 ease-in-out hover:scale-105"
                  }
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
