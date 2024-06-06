"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import VerticalMenu from './components/VerticalMenu';
import PersonalData from './components/PersonalData';
import FavWod from './components/FavWod';
import RM from './components/RM';
import Calories from './components/Calories';
import { getCookie } from '@/utils/cookies';

function Page() {
  const [selectedOption, setSelectedOption] = useState('datosPersonales');
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className='flex flex-col sm:flex-row bg-white w-fit'>
        <VerticalMenu selectedOption={selectedOption} onSelectOption={setSelectedOption} />
        <div className="flex-grow p-4">
          {selectedOption === 'datosPersonales' && <PersonalData />}
          {selectedOption === 'wod' && <FavWod />}
          {selectedOption === 'rm' && <RM />}
          {selectedOption === 'calculadora' && <Calories />}
        </div>
      </div>
    </div>
  );
}

export default Page;
