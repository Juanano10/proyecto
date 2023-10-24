import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';



interface UpdateBtnProps {
  id: string;
  name: string;
  price: number;
  description: string;
  code: string;
  stock: string;
}

const UpdateBtn: React.FC<UpdateBtnProps> = ({ id, name, price, description, code, stock }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedCode, setUpdatedCode] = useState(code);
  const [updatedStock, setUpdatedStock] = useState(stock);

  const handleUpdateProduct = () => {
    const updatedProductData = {
      id,
      name: updatedName,
      price: updatedPrice,
      description: updatedDescription,
      code: updatedCode,
      stock: updatedStock,
    };

    console.log("Datos a enviar:", updatedProductData);

    axios
      .put(`/api/product/${id}`, updatedProductData)
      .then((response) => {
        console.log("Respuesta del servidor:", response);
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al actualizar el producto', error);
      });
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-700 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Producto"
        className="bg-gray-800 rounded-lg p-6 mx-auto mt-10 w-3/4 md:w-1/2 lg:w-1/3"
      >
        <h2 className="text-2xl mb-4 font-bold text-white">Editar Producto</h2>
        <input
          type="text"
          placeholder="Nuevo nombre"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4 w-full rounded-md placeholder-gray-400 text-gray-800 flex mb-4"
        />
        <input
          type="number"
          placeholder="Nuevo precio"
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(Number(e.target.value))}
          className="border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4 w-full rounded-md placeholder-gray-400 text-gray-800 flex mb-4"
        />
        <input
          type="text"
          placeholder="Nueva descripción"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4 w-full rounded-md placeholder-gray-400 text-gray-800 flex mb-4"
        />
        <input
          type="text"
          placeholder="Nuevo código"
          value={updatedCode}
          onChange={(e) => setUpdatedCode(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4 w-full rounded-md placeholder-gray-400 text-gray-800 flex mb-4"
        />
        <input
          type="text"
          placeholder="Nuevo stock"
          value={updatedStock}
          onChange={(e) => setUpdatedStock(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-4 w-full rounded-md placeholder-gray-400 text-gray-800 flex mb-4"
        />
        <div className="flex flex-wrap justify-end gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded focus:outline-none"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpdateProduct}
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded focus:outline-none"
          >
            Actualizar
          </button>
        </div>
      </Modal>
    </div>
);

};

export { UpdateBtn };