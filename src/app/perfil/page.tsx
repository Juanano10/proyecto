"use client"
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from '../components/Header';

function ProfilePage() {
  const { data: session } = useSession();

  // Verificamos si el usuario está autenticado
  if (!session) {
    // Si no está autenticado, puedes mostrar un mensaje o redirigirlo a la página de inicio de sesión
    return (
      <div className="bg-slate-900 min-h-screen flex flex-col">
        <Navbar />
        <div className="bg-white flex-grow flex mt-1 mr-2 mb-2 rounded-lg p-4">
          <div className="container mx-auto p-4">
            <Header /> {/* Encabezado */}
            <h1 className="text-3xl font-bold mb-4">Perfil de Usuario</h1>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="mb-4 md:mb-0 md:mr-4">Debes iniciar sesión para ver tu perfil.</p>
              {/* Otros elementos que puedas necesitar */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Si el usuario está autenticado, puedes acceder a sus datos en session.user
  const { user } = session;

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">
      <div className="flex-grow flex">
      <Navbar />
      <div className="bg-white flex-grow flex mt-1 mr-2 mb-2 rounded-lg p-4">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Perfil de Usuario</h1>

          {/* Datos del Perfil */}
          <div className="bg-white p-4 shadow-md rounded">
            <h2 className="text-xl font-semibold mb-2">
              Información del Usuario
            </h2>

            <div className="mb-4">
              <strong>Nombre:</strong> {user.name}
            </div>
            <div className="mb-4">
              <strong>Correo:</strong> {user.email}
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
