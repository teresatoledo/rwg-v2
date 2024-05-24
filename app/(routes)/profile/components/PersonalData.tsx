// components/DatosPersonales.js

import React from 'react';

const PersonalData = ({ userData }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Datos Personales</h2>
      <p>Nombre: {userData.name}</p>
      <p>Apellido: {userData.lastname}</p>
      <p>Correo: {userData.email}</p>
      <p>Contraseña: *********</p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Cambiar Contraseña</button>
      <button className="bg-red-500 text-white py-2 px-4 rounded mt-2">Cerrar Sesión</button>
    </div>
  );
};

export default PersonalData;
