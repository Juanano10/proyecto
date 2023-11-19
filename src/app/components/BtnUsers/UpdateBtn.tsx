import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Enumeración de roles
enum UserRoles {
  CONSULTOR = "consultor",
  REPONEDOR = "reponedor",
  ADMINISTRADOR = "administrador",
}

interface UpdateBtnProps {
  id: string;
  name: string;
  email: string;
  role: UserRoles; // Utilizar la enumeración de roles
  password: string;
  // Agrega otros campos si es necesario
}

const UpdateBtn: React.FC<UpdateBtnProps> = ({ id, name, email, role, password }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedRole, setUpdatedRole] = useState(role);
  const [updatedPass, setUpdatedPass] = useState(password);

  const handleUpdateUser = () => {
    const updatedUserData = {
      id,
      role: updatedRole,
      password: updatedPass,
      // Agregar otros campos si es necesario
    };

    axios
      .put(`/api/usuarios/${id}`, updatedUserData)
      .then((response) => {
        setIsModalOpen(false);
        window.location.reload(); // Recargar la página después de la actualización
      })
      .catch((error) => {
        console.error('Error al actualizar el usuario', error);
      });
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-700 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Usuario"
        className="bg-gray-800 rounded-lg p-6 mx-auto mt-10 w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl mb-4 font-bold text-white">Editar Usuario</h2>
        <select
          name="role"
          value={updatedRole}
          onChange={(e) => setUpdatedRole(e.target.value as UserRoles)}
          className="bg-white px-4 py-2 w-full text-gray-800 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:border-indigo-500 mb-4"
        >
          {Object.values(UserRoles).map((roleOption) => (
            <option key={roleOption} value={roleOption}>
              {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nueva contraseña"
          value={updatedPass}
          onChange={(e) => setUpdatedPass(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4 w-full rounded-md placeholder-gray-400 text-gray-800 flex mb-4"
        />
        <div className="flex flex-wrap justify-end gap-4">
          <button onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded focus:outline-none">Cancelar</button>
          <button onClick={handleUpdateUser} className="-full sm:w-auto px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded focus:outline-none">Actualizar</button>
        </div>
      </Modal>
    </div>
  );
};

export { UpdateBtn };
