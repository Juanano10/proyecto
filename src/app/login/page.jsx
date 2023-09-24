
import Link from "next/link"
function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-500">
      <div className="bg-zinc-700 rounded-md p-10 w-96">
        <form className="space-y-4">
          <h3 className="text-2xl font-bold text-white text-center">Inicio de Sesión</h3>
          <div>
            

          </div>
          <div>
            <input
              className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              type="email"
              placeholder="Correo Electrónico"
              name="email"
            />
          </div>
          <div>
            <input
              className="bg-zinc-700 px-4 py-2 w-full text-white placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              type="password"
              placeholder="Contraseña"
              name="password"
            />
          </div>
          <div>
          <Link href={"/"} >
            <button
              className="bg-indigo-500 text-white px-5 py-2 w-full rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700"
              type="submit"
            >
              Iniciar Sesión
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
  }

export default LoginPage