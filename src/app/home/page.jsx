"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ReportPage() {
  const [notifications, setNotifications] = useState([]);
  const [notificationsHistory, setNotificationsHistory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulación de transacciones y recordatorios
    const simulatedTransactions = [
      { id: 1, action: 'Venta', product: 'Producto 1', quantity: 3 },
      { id: 2, action: 'Compra', product: 'Producto 2', quantity: 5 },
      // Agregar más transacciones según sea necesario
    ];

    const simulatedReminders = [
      'Recordatorio: Reabastecer Producto X',
      'Recordatorio: Revisar inventario de Producto Y',
      // Agregar más recordatorios según sea necesario
    ];

    setTransactions(simulatedTransactions);
    setReminders(simulatedReminders);

    const addNewProductNotification = (product) => {
      const newNotification = {
        id: notifications.length + 1,
        message: `El producto ${product.name} necesita ser reabastecido (cantidad: ${product.quantity})`,
        timestamp: new Date().toLocaleString(),
      };
      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications, newNotification].slice(-5); // Limitar a 5 notificaciones
        return updatedNotifications;
      });
      setNotificationsHistory((prevHistory) => [...prevHistory, newNotification]);
    };

    const productInterval = setInterval(() => {
      const newProduct = {
        id: products.length + 1,
        name: `Nuevo Producto ${products.length + 1}`,
        quantity: Math.floor(Math.random() * 30) + 1,
      };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      if (newProduct.quantity === 20) {
        addNewProductNotification(newProduct);
      }
    }, 1000); // Cada 10 segundos

    return () => {
      clearInterval(productInterval);
    };
  }, [notifications, products]);

  const handleDeleteNotification = (id) => {
    setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
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
              <h2 className="text-xl font-semibold mb-2">Histórico de Transacciones</h2>
              <ul>
                {notificationsHistory.map((notification, index) => (
                  <li key={index} className="mb-2">
                    {notification.message}
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
