"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

function Page() {
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('')

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('La nueva contraseña y la confirmación no coinciden');
      return;
    }
    if (currentPassword === newPassword) {
      setErrorMessage('La contraseña nueva no puede ser igual a la actual');
      return;
    }

    try {
      const response = await fetch('/api/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });
      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(result.message || 'Error al cambiar la contraseña');
      } else {
        setMessage('Contraseña cambiada con éxito')
        setErrorMessage('')
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setErrorMessage('Error al cambiar la contraseña');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-fit sm:w-[400px] bg-white">
        <h2 className="text-lg font-semibold my-4">Cambiar contraseña</h2>
        <Input className="w-60 my-2" type="password" id="currentPassword" placeholder="Contraseña actual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        <Input className="w-60 my-2" type="password" id="newPassword" placeholder="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <Input className="w-60 my-2" type="password" id="confirmNewPassword" placeholder="Confirmar nueva contraseña" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
        <Button onClick={handleChangePassword} className="my-2">Cambiar contraseña</Button>
        <p className="text-lg text-red-500 text-center mx-3">{errorMessage}</p>
        <p className='text-lg'>{message}</p>
      </div>
    </div>
  );
}

export default Page;
