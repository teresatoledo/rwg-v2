"use client"
import React, { useEffect, useState } from 'react'
import VerticalMenu from './components/VerticalMenu';
import PersonalData from './components/PersonalData';
import FavWod from './components/FavWod';
import RM from './components/RM';
import Calories from './components/Calories';

// import { getUserData, getFavoriteWODs } from '@/api'; // Aquí importa tus funciones para obtener los datos de la API
function Page() {
  const [selectedOption, setSelectedOption] = useState('datosPersonales');
  const [userData, setUserData] = useState({});
  const [favoriteWODs, setFavoriteWODs] = useState([]);

  // useEffect(() => {
  //   // Obtiene los datos del usuario de la API
  //   getUserData().then(data => setUserData(data));
  //   // Obtiene los WODs favoritos de la API
  //   getFavoriteWODs().then(data => setFavoriteWODs(data));
  // }, []);

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className='flex flex-col sm:flex-row bg-white w-fit'>
        <VerticalMenu selectedOption={selectedOption} onSelectOption={setSelectedOption} />
        <div className="flex-grow p-4">
          {selectedOption === 'datosPersonales' && <PersonalData userData={userData} />}
          {selectedOption === 'wod' && <FavWod favoriteWODs={favoriteWODs} />}
          {selectedOption === 'rm' && <RM />}
          {selectedOption === 'calculadora' && <Calories />}
        </div>
      </div>
    </div>
  );
}

export default Page