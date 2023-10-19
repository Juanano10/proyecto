import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

interface UpdateBtnProps {
  id: string;
  name: string; // Agrega los campos de usuario (nombre, correo, etc.) para mostrar en el formulario
  email: string;
  // Agrega otros campos si es necesario
}

const UpdateBtn: React.FC<UpdateBtnProps> = ({ id, name, email }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);

  const handleUpdateUser = () => {
    // Construye el objeto de datos para enviar al servidor (nombre, correo, etc.)
    const updatedUserData = {
      name: updatedName,
      email: updatedEmail,
      // Agrega otros campos si es necesario
    };

    axios
      .put(`/api/usuarios/${id}`, updatedUserData)
      .then((response) => {
        // Realiza alguna acción adicional si es necesario después de la actualización
        // Por ejemplo, puedes cerrar el modal o actualizar la lista de usuarios
        setIsModalOpen(false); // Cierra el modal
        // Puedes agregar una función para actualizar la lista de usuarios aquí si es necesario
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
        {/* Contenido del formulario modal */}
        <h2>Editar Usuario</h2>
        <input
          type="text"
          placeholder="Nuevo nombre"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nuevo correo"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
        {/* Otros campos del formulario si es necesario */}
        <button onClick={handleUpdateUser}>Actualizar</button>
        <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
      </Modal>
    </div>
  );
};

export { UpdateBtn };
