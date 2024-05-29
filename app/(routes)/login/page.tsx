"use client"

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function Page() {
  const [active, setActive] = useState<string>('');
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/profile');
      } else {
        console.error('Error al registrar usuario:', await response.json());
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        
      });
      if (response.ok) {
        router.push('/profile');
      } else {
        console.log(response)
        console.error('Error al iniciar sesión aquí:', await response.json());
      }
    } catch (error) {
      console.error('Error doble al iniciar sesión:', error);
    }
  };

  const handleToggleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActive('');
  };

  const handleToggleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActive('active');
  };

  return (
    <div className='h-screen flex justify-center'>
      <div className={`container ${active}`}>
        <div className='form-container sign-up'>
          <form onSubmit={handleRegister}>
            <h3>Crear cuenta</h3>
            <input type="text" name="firstName" id="firstName" placeholder='Nombre' />
            <input type="text" name="lastName" id="lastName" placeholder='Apellido' />
            <input type="email" name="email" id="NewEmail" autoComplete='username' placeholder='Email' />
            <input type="password" name="password" id="NewPassword" autoComplete='new-password' placeholder='Contraseña' />
            <Button type='submit'>Crear cuenta</Button>
          </form>
        </div>
        <div className='form-container login'>
          <form onSubmit={handleLogin}>
            <h3>Iniciar sesión</h3>
            <input type="email" name="email" id="LoginEmail" autoComplete='username' placeholder='Email' />
            <input type="password" name="password" id="LoginPassword" autoComplete='current-password' placeholder='Contraseña' />
            <a href="#">¿Has olvidado tu contraseña?</a>
            <Button type='submit'>Iniciar sesión</Button>
          </form>
        </div>
        <div className='toggle-container'>
          <div className='toggle'>
            <div className='toggle-panel toggle-left'>
              <h4>¡Te damos la bienvenida de nuevo!</h4>
              <p>Introduce tus credenciales para poder acceder a todas las funcionalidades de RWG.</p>
              <Button className='transparent' onClick={handleToggleLogin}>Iniciar sesión</Button>
            </div>
            <div className='toggle-panel toggle-right'>
              <h4>¡Hola!</h4>
              <p>Regístrate para poder acceder a todas las funcionalidades de RWG.</p>
              <Button className='transparent' onClick={handleToggleRegister}>Crear cuenta</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
