"use client";
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import Navbar from "src/app/components/Navbar";
import Footer from "./../components/Footer";
import ReportGenerator from "../components/pdf";

function HomePage() {
  const initialReports = [
    {
      id: 1,
      title: "Informe de Ventas",
      date: "2023-09-25",
      description: "Descripción del informe de ventas",
      author: "Juan Pérez",
      downloadLink: "url_para_descargar_informe_1",
    },
    {
      id: 2,
      title: "Informe de Compras",
      date: "2023-09-24",
      description: "Descripción del informe de compras",
      author: "María García",
      downloadLink: "url_para_descargar_informe_2",
    },
    // ... Agrega más informes según sea necesario
  ];

  const [reports, setReports] = useState(initialReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredReports = initialReports.filter(report =>
      report.title.toLowerCase().includes(term)
    );
    setReports(filteredReports);
  };

  const handleSort = (type) => {
    setSortType(type);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');

    const sortedReports = [...reports].sort((a, b) => {
      const sortOrder = sortDirection === 'asc' ? 1 : -1;
      if (type === 'title') {
        return sortOrder * a.title.localeCompare(b.title);
      } else if (type === 'date') {
        return sortOrder * new Date(a.date) - new Date(b.date);
      }
      return 0;
    });

    setReports(sortedReports);
  };

  const sortedReports = [...reports].sort((a, b) => {
    const sortOrder = sortDirection === 'asc' ? 1 : -1;
    if (sortType === 'title') {
      return sortOrder * a.title.localeCompare(b.title);
    } else if (sortType === 'date') {
      return sortOrder * new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  const filteredReports = sortedReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-black">Registro de Informes</h1>
            {/* Barra de búsqueda */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={handleSearch}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>

            {/* Lista de Informes Filtrada */}
            <div className="bg-white p-4 shadow-md rounded mt-8">
              <h2 className="text-xl font-semibold mb-4">Lista de Informes</h2>
              <table className="w-full">
                <thead className="border-b border-gray-300">
                  <tr>
                    <th
                      className="px-4 py-2 cursor-pointer text-left"
                      onClick={() => handleSort('title')}
                    >
                      Título
                    </th>
                    <th
                      className="px-4 py-2 cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      Fecha
                    </th>
                    <th className="px-4 py-2">Autor</th>
                    <th className="px-4 py-2">Descargar</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapea y muestra los informes filtrados y ordenados */}
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="border-b border-gray-300">
                      <td className="px-4 py-2">{report.title}</td>
                      <td className="px-4 py-2">{report.date}</td>
                      <td className="px-4 py-2">{report.author}</td>
                      <td className="px-4 py-2 text-center">
                        <a href={report.downloadLink} download>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-500 hover:text-blue-700 transition duration-300 inline-block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Generador de Informes */}
            <div className="mt-6 flex justify-center">
              <div className="border border-gray-300 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300">
                <ReportGenerator />
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