import React from 'react'


const VerticalMenu = ({ selectedOption, onSelectOption }) => {
  return (
    <div className="flex flex-col bg-gray-200 p-4">
      <button
        className={`py-2 px-4 mb-2 rounded ${selectedOption === 'datosPersonales' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
        onClick={() => onSelectOption('datosPersonales')}
      >
        Datos Personales
      </button>
      <button
        className={`py-2 px-4 mb-2 rounded ${selectedOption === 'wod' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
        onClick={() => onSelectOption('wod')}
      >
        WOD
      </button>
      <button
        className={`py-2 px-4 mb-2 rounded ${selectedOption === 'rm' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
        onClick={() => onSelectOption('rm')}
      >
        RM
      </button>
      <button
        className={`py-2 px-4 mb-2 rounded ${selectedOption === 'calculadora' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
        onClick={() => onSelectOption('calculadora')}
      >
        Calculadora
      </button>
    </div>
  );
};

export default VerticalMenu;