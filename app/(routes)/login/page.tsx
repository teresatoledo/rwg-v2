"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getCookie } from '@/utils/cookies';

function Page() {
  const [active, setActive] = useState<string>('');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [loginForm, setLoginForm] = useState('');
  const [registerForm, setRegisterForm] = useState('hidden');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const router = useRouter();

  useEffect(() => {
    //If token exists, login is not accesible, it redirects to profile.
    const token = getCookie('token');
    if (token) {
      router.replace('/profile');
    }
  }, [router]);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        setRegisterSuccess('Te has registrado correctamente, ya puedes iniciar sesión.');
        setRegisterData({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        });
        setRegisterError('');
        setLoginForm('');
        setRegisterForm('hidden');
      } else {
        const errorData = await response.json();
        setRegisterError(errorData.message || 'Error al registrar usuario.');
        setRegisterSuccess('');
      }
    } catch (error) {
      setRegisterError('Error al registrar usuario.');
      setRegisterSuccess('');
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
        setLoginError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        console.error('Error al iniciar sesión:', await response.json());
      }
    } catch (error) {
      setLoginError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleToggleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActive('');
    setRegisterSuccess('');
    setRegisterError('');
  };

  const handleToggleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActive('active');
    setRegisterSuccess('');
    setRegisterError('');
  };

  const handleRegisterForm = () => {
    setRegisterForm('');
    setLoginForm('hidden');
    setRegisterSuccess('');
    setRegisterError('');
  };

  const handleLoginForm = () => {
    setLoginForm('');
    setRegisterForm('hidden');
    setRegisterSuccess('');
    setRegisterError('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  return (
    <>
      <div className='h-screen hidden sm:flex justify-center'>
        <div className={`container ${active}`}>
          <div className='form-container sign-up'>
            <form onSubmit={handleRegister}>
              <h3>Crear cuenta</h3>
              <input type="text" name="firstName" id="firstName" placeholder='Nombre' value={registerData.firstName} onChange={handleInputChange} />
              <input type="text" name="lastName" id="lastName" placeholder='Apellido' value={registerData.lastName} onChange={handleInputChange} />
              <input type="email" name="email" id="NewEmail" autoComplete='username' placeholder='Email' value={registerData.email} onChange={handleInputChange} />
              <input type="password" name="password" id="NewPassword" autoComplete='new-password' placeholder='Contraseña' value={registerData.password} onChange={handleInputChange} />
              <Button type='submit'>Crear cuenta</Button>
              <p className='text-lg'>{registerSuccess}</p>
              <p className='text-lg text-red-500 text-center'>{registerError}</p>
            </form>
          </div>
          <div className='form-container login'>
            <form onSubmit={handleLogin}>
              <h3>Iniciar sesión</h3>
              <input type="email" name="email" id="LoginEmail" autoComplete='username' placeholder='Email' />
              <input type="password" name="password" id="LoginPassword" autoComplete='current-password' placeholder='Contraseña' />
              <Button type='submit'>Iniciar sesión</Button>
              <p className='text-lg text-red-500 text-center'>{loginError}</p>
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
      <div className='h-screen flex sm:hidden justify-center'>
        <div className={`form-container-mobile ${loginForm}`}>
          <p className="title">¡Hola!</p>
          <form className="form" onSubmit={handleLogin}>
            <input type="email" name="email" id="LoginEmailMobile" autoComplete='username' placeholder='Email' />
            <input type="password" name="password" id="LoginPasswordMobile" autoComplete='current-password' placeholder='Contraseña' />
            <Button type='submit'>Iniciar sesión</Button>
            <p className='text-lg text-red-500 text-center'>{loginError}</p>
            <p className='text-center'>{registerSuccess}</p>
          </form>
          <p className="sign-up-label">
            ¿Todavía no tienes una cuenta?<span className="pl-1 sign-up-link" onClick={handleRegisterForm}>Regístrate</span>
          </p>
        </div>
        <div className={`form-container-mobile ${registerForm}`}>
          <p className="title">¡Hola!</p>
          <form className="form" onSubmit={handleRegister}>
            <input type="text" name="firstName" id="firstNameMobile" placeholder='Nombre' value={registerData.firstName} onChange={handleInputChange} />
            <input type="text" name="lastName" id="lastNameMobile" placeholder='Apellido' value={registerData.lastName} onChange={handleInputChange} />
            <input type="email" name="email" id="NewEmailMobile" autoComplete='username' placeholder='Email' value={registerData.email} onChange={handleInputChange} />
            <input type="password" name="password" id="NewPasswordMobile" autoComplete='new-password' placeholder='Contraseña' value={registerData.password} onChange={handleInputChange} />
            <Button type='submit'>Crear cuenta</Button>
            <p className='text-lg text-red-500 text-center'>{registerError}</p>
          </form>
          <p className="sign-up-label">
            ¿Ya tienes cuenta?<span className="pl-1 sign-up-link" onClick={handleLoginForm}>Inicia sesión</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Page;
