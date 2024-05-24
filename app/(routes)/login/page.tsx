"use client"
import { Button } from '@/components/ui/button';
import React from 'react'
import { useState } from 'react';

function Page() {
  const [active, setActive] = useState<String>('')
  const handleRegister = () => {
    setActive('active')
  }
  const handleLogin = () => {
    setActive('')
  }
  return (
    <div className='h-screen flex justify-center'>
      <div className={`container ${active}`}>
        <div className='form-container sign-up'>
          <form>
            <h3>Crear cuenta</h3>
            <input type="text" name="Name" id="Name" placeholder='Nombre' />
            <input type="email" name="Email" id="Email" placeholder='Email' />
            <input type="password" name="Password" id="Password" placeholder='Contraseña' />
            <Button>Crear cuenta</Button>
          </form>
        </div>
        <div className='form-container login'>
          <form>
            <h3>Iniciar sesión</h3>
            <input type="email" name="Email" id="Email" placeholder='Email' />
            <input type="password" name="Password" id="Password" placeholder='Contraseña' />
            <a href="#">¿Has olvidado tu contraseña?</a>
            <Button>Iniciar sesión</Button>
          </form>
        </div>
        <div className='toggle-container'>
          <div className='toggle'>
            <div className='toggle-panel toggle-left'>
              <h4>¡Te damos la bienvenida de nuevo!</h4>
              <p>Introduce tus credenciales para poder acceder a todas las funcionalidades de RWG.</p>
              <Button className='transparent' onClick={handleLogin}>Iniciar sesión</Button>
            </div>
            <div className='toggle-panel toggle-right'>
              <h4>¡Hola!</h4>
              <p>Regístrate para poder acceder a todas las funcionalidades de RWG.</p>
              <Button className='transparent' onClick={handleRegister}>Crear cuenta</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page