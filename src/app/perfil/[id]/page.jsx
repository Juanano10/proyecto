/* eslint-disable @next/next/no-img-element */
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Supongamos que tienes una función getUser que obtiene datos del usuario de una API
async function getUser(id) {
  const res = await fetch(`https://reqres.in/api/users/${id}`);
  const data = await res.json();
  return data.data;
}

async function ProfilePage({ params }) {
  const user = await getUser(params.id);

  return (
    <div className="bg-indigo-600 min-h-screen flex flex-col">
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
                <strong>Nombre:</strong> {user.first_name} {user.last_name}
              </div>
              <div className="mb-4">
                <strong>ID:</strong> {user.id}
              </div>
              <div className="mb-4">
                <strong>Correo:</strong> {user.email}
              </div>
              <div className="mb-4">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="m-auto my-4 rounded-full"
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

export default ProfilePage;
