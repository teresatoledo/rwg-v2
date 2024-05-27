// components/DatosPersonales.js

import { Button } from '@/components/ui/button';
import React from 'react';

const PersonalData = ({ userData }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Datos Personales</h2>
      <p>Nombre: {userData.name}</p>
      <p>Apellido: {userData.lastName}</p>
      <p>Correo: {userData.email}</p>
      <p>Contraseña: *********</p>
      <Button>Cambiar Contraseña</Button>
      <Button className="bg-red-500 text-white py-2 px-4 rounded m-2">Cerrar Sesión</Button>
    </div>
  );
};

export default PersonalData;
