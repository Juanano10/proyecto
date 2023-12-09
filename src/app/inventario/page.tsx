// ... Otras importaciones ...

import { useSession } from "next-auth/react";

function Inventario() {
  const { data: session } = useSession();
  const isAdmin = () => session?.user?.role === "administrador";

  // Resto de tu código...

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Navbar />
        <div className="bg-blue-900 flex-grow mr-2 mb-1 rounded-lg p-4 mt-1 max-w-[sm]">
          {/* ... Otro contenido del componente ... */}
          <div className="container mx-auto p-1 mt-3">
            <div className="card">
              {/* ... Resto del formulario ... */}
              <h3 className="text-2xl font-bold text-center mb-6">
                <u className="hover:underline hover:cursor-pointer transition duration-300 ease-in-out">
                  Registrar Producto
                </u>
              </h3>
              {isAdmin() && (
                // Contenido exclusivo para administradores
                <div>
                  <h4 className="text-xl font-bold mb-2 text-center">
                    Agregar Usuario
                  </h4>
                  <form
                    // ... Ajusta los atributos del formulario según sea necesario
                  >
                    {/* Agrega los campos necesarios para agregar un usuario */}
                    {/* Por ejemplo: nombre, correo electrónico, rol, etc. */}
                    <div className="mb-4">
                      <label
                        className="block text-sm font-semibold mb-2 text-gray-300"
                        htmlFor="userName"
                      >
                        Nombre de Usuario
                      </label>
                      <input
                        type="text"
                        id="userName"
                        name="userName"
                        placeholder="Nombre de Usuario"
                        className="w-full px-4 py-2 rounded border border-gray-800 text-gray-800 focus:outline-none focus:shadow-outline"
                      />
                    </div>

                    {/* Agrega más campos según sea necesario */}
                    
                    <div className="mb-6">
                      <button
                        className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded border border-blue-600 hover:border-blue-400 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Agregar Usuario
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {/* ... Resto del código del formulario ... */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
        style={{ fontSize: '1.4rem' }}
      />
    </div>
  );
}

export default Inventario;
