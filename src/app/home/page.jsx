"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import axios from 'axios';

function ReportPage() {
  const [notifications, setNotifications] = useState([]);
  const [notificationsHistory, setNotificationsHistory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [products, setProducts] = useState([]);

  // Lógica de inicialización fuera del useEffect
  const simulatedTransactions = [
    // ...
  ];

  const simulatedReminders = [
    // ...
  ];

  useEffect(() => {
    // Obtener datos reales de productos
    axios
      .get("/api/product/id")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de productos", error);
      });
  }, []); // Sin dependencias

  useEffect(() => {
    // Simulación de transacciones y recordatorios
    setTransactions(simulatedTransactions);
    setReminders(simulatedReminders);

    const addNewProductNotification = (product) => {
      setNotifications((prevNotifications) => {
        const newNotification = {
          id: prevNotifications.length + 1,
          message: `El producto ${product.name} necesita ser reabastecido (cantidad: ${product.stock})`,
          timestamp: new Date().toLocaleString(),
        };
        const updatedNotifications = [...prevNotifications, newNotification].slice(-5);
        setNotificationsHistory((prevHistory) => [...prevHistory, newNotification]);
        return updatedNotifications;
      });
    };

    // Verificar productos con bajo stock y generar notificaciones
    const checkLowStockProducts = () => {
      products.forEach((product) => {
        if (product.stock < 20) {
          addNewProductNotification(product);
        }
      });
    };

    // Verificar productos con bajo stock cada 10 segundos
    const productInterval = setInterval(() => {
      checkLowStockProducts();
    }, 10000); // Tiempo en registrar la notificacion

    return () => {
      clearInterval(productInterval);
    };
  }, [products]);

  // Función para manejar la eliminación de notificaciones
  const handleDeleteNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Sistema de Notificaciones</h1>

            <div className="bg-white p-4 shadow-md rounded">
              <h2 className="text-xl font-semibold mb-2">Notificaciones Recientes</h2>
              <ul className="divide-y divide-gray-300">
                {notifications.map((notification) => (
                  <li key={notification.id} className="py-2">
                    <p className="text-lg">{notification.message}</p>
                    <p className="text-sm text-gray-500">{notification.timestamp}</p>
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="bg-red-500 text-white font-bold py-1 px-2 mt-2 rounded"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>

        

            <div className="bg-white p-4 shadow-md rounded mt-4">
              <h2 className="text-xl font-semibold mb-2">Recordatorios</h2>
              <ul>
                {reminders.map((reminder, index) => (
                  <li key={index} className="mb-2">
                    {reminder}
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
