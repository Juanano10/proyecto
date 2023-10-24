"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { InventoryTransactionDocument } from "../../models/InventarioTrans";

function Historial() {
  const [inventariotrans, setInventarioTrans] = useState<InventoryTransactionDocument[]>([]);

  useEffect(() => {
    // Cambia la ruta de la solicitud a la correcta
    axios
      .get("/api/InventoryTransaction/id")
      .then((response) => {
        setInventarioTrans(response.data.history);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de transacciones", error);
      });
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Historial de Movimientos</h1>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Fecha</th>
                    <th className="border px-4 py-2">Producto</th>
                    <th className="border px-4 py-2">Cantidad</th>
                    <th className="border px-4 py-2">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {inventariotrans.map((trans) => (
                    <tr key={trans._id}>
                      <td className="border px-4 py-2">{new Date(trans.timestamp).toLocaleDateString()}</td>
                      <td className="border px-4 py-2">{trans.product /* Si product es un ObjectId, se necesita más información para mostrarlo adecuadamente */}</td>
                      <td className="border px-4 py-2">{trans.stock}</td>
                      <td className={`border px-4 py-2 ${trans.type === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                        {trans.type === 'entrada' ? 'Incremento' : 'Decremento'}
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

export default Historial;
