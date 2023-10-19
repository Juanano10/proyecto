import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

interface UpdateBtnProps {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  // Agrega otros campos si es necesario
}

const UpdateBtn: React.FC<UpdateBtnProps> = ({ id, name, email, role, password }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedRole, setUpdatedRole] = useState(role);
  const [updatedPass, setUpdatedPass] = useState(password);

  const handleUpdateUser = () => {
    const updatedUserData = {
      id, // Pasar el ID al objeto de datos
      name: updatedName,
      email: updatedEmail,
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
      <button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Usuario"
      >
        <h2>Editar Usuario</h2>
        <input
          type="text"
          placeholder="Nuevo nombre"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nuevo rol"
          value={updatedRole}
          onChange={(e) => setUpdatedRole(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nuevo Password"
          value={updatedPass}
          onChange={(e) => setUpdatedPass(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nuevo correo"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
        <button onClick={handleUpdateUser}>Actualizar</button>
        <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
      </Modal>
    </div>
  );
};

export { UpdateBtn };
