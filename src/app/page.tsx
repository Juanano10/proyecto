"use client";
// use client
import Link from "next/link"
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0 },
};

const contentVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  exit: { x: -100, opacity: 0 },
};

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.error) setError(res.error as string);

      if (res?.ok) route.push('/home');
    } catch (error) {
      setError("Hubo un error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-gradient-to-b from-indigo-700 to-purple-500 relative"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/foto-gratis/fondo-azul-degradado-lujo-abstracto-azul-oscuro-liso-banner-estudio-vineta-negra_1258-52393.jpg?w=2000&t=st=1702243039~exp=1702243639~hmac=7c753441475bd2f1b833a5526b9bb234af762fb67dfbad3e01cdc79e05d5aec8')",
      }}
    >
      <div className="flex items-center justify-center min-h-screen sm:flex-col">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-3xl p-4 rounded-lg shadow-lg bg-opacity-80 bg-white mt-10 relative grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="p-4 bg-opacity-70">
            <div className="mb-4 text-left text-black">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                Inicio de Sesión
              </h2>
              <p className="text-sm sm:text-base font-bold text-center text-gray-800">
                Ingresa tus credenciales para acceder a nuestra plataforma.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {loading && (
                <div className="text-center">
                </div>
              )}
              {error && (
                <div className="bg-opacity-80 bg-red-100 border border-red-500 text-red-700 p-2">
                  {error}
                </div>
              )}
              <div className="text-center">
                <input
                  className="bg-opacity-80 border border-gray-400 w-full sm:w-64 py-2 sm:py-3 rounded-md inline-block"
                  type="email"
                  placeholder="Correo Electrónico"
                  name="email"
                />
              </div>
              <div className="text-center">
                <input
                  className="bg-opacity-80 border border-gray-400 w-full sm:w-64 py-2 sm:py-3 rounded-md inline-block"
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                />
              </div>
              <div className="text-center">
                <button
                  className="bg-opacity-80 bg-indigo-500 text-white w-full sm:w-64 py-3 sm:py-2 rounded-md mx-auto hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700 shadow-md border border-indigo-500"
                  type="submit"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-4 bg-gradient-to-b from-blue-200 to-blue-500 relative"
          >
<div className="text-sm text-left text-black justify-center">
  <h2 className="text-2xl sm:text-3xl font-bold text-center relative mb-4">
    <div className="text-3xl font-extrabold mb-2 sm:mb-0">
      <span>FillFast</span><span className="text-blue-500">Technology</span>
    </div>
    <span className="absolute -bottom-5 left-0 w-full h-1 bg-black"></span>
  </h2>
  <p className="text-base sm:text-lg font-semibold text-center text-gray-1100 mb-4 mx-4">
    Potencia tu negocio con una gestión de inventario inteligente.
    Controla tus productos y optimiza tus operaciones con nuestra
    plataforma de gestión de inventario.
  </p>
</div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LoginPage;
