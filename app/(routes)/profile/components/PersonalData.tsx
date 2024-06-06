"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

const PersonalData = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          router.push('/login')
          console.error('Error al obtener datos del usuario:', response.status);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };
  
    fetchUserData();
  }, []);
  const handleCloseSession = () => {
    destroyCookie(null, 'token',  { path: '/' });
    router.push('/')
  };
  const changePassword = () => {
    const cookies = parseCookies();
    if (cookies.token) {
      router.push('/changePassword');
    } else {
      console.error('No autorizado: la sesión ha expirado.');
    }
  };
  return (
    <div className='text-center sm:text-start'>
      <h2 className="text-lg font-semibold mb-4 ">Datos personales</h2>
      <p>Nombre: {userData.firstName}</p>
      <p>Apellido: {userData.lastName}</p>
      <p>Correo: {userData.email}</p>
      <p>Contraseña: *********</p>
      <Button onClick={changePassword}>Cambiar Contraseña</Button>
      <Button onClick={handleCloseSession} className="bg-red-500 text-white py-2 px-4 rounded m-2">Cerrar Sesión</Button>
    </div>
  );
};

export default PersonalData;
