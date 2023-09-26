import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function ReportPage() {
  const reportData = [
    { id: 1, title: 'Informe: Reporte de venta', description: 'Descripción del informe 1' },
    { id: 2, title: 'Informe 2', description: 'Descripción del informe 2' },
    { id: 3, title: 'Informe 3', description: 'Descripción del informe 3' },
    // Agrega más informes según sea necesario
  ];

  return (
    <div className="bg-indigo-600 min-h-screen flex flex-col">
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Informes Disponibles</h1>

            <div className="bg-white p-4 shadow-md rounded">
              <h2 className="text-xl font-semibold mb-2">Lista de Informes</h2>
              <ul>
                {reportData.map((report) => (
                  <li key={report.id} className="mb-4">
                    <h3 className="text-lg font-semibold">{report.title}</h3>
                    <p className="text-gray-600">{report.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReportPage;


