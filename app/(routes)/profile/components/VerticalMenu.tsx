import React from 'react'


const VerticalMenu = ({ selectedOption, onSelectOption }) => {
  return (
    <div className="flex flex-row sm:flex-col gap-2 justify-center bg-white p-4">
      <button
        className={`text-sm sm:text-md py-2 px-2 sm:px-4 mb-2 rounded ${selectedOption === 'datosPersonales' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border-2 border-slate-300'}`}
        onClick={() => onSelectOption('datosPersonales')}
      >
        Datos personales
      </button>
      <button
        className={`text-sm sm:text-md py-2 px-2 sm:px-4 mb-2 rounded ${selectedOption === 'wod' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border-2 border-slate-300'}`}
        onClick={() => onSelectOption('wod')}
      >
        WOD
      </button>
      <button
        className={`text-sm sm:text-md py-2 px-2 sm:px-4 mb-2 rounded ${selectedOption === 'rm' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border-2 border-slate-300'}`}
        onClick={() => onSelectOption('rm')}
      >
        RM
      </button>
      <button
        className={`text-sm sm:text-md py-2 px-2 sm:px-4 mb-2 rounded ${selectedOption === 'calculadora' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border-2 border-slate-300'}`}
        onClick={() => onSelectOption('calculadora')}
      >
        Calculadora
      </button>
    </div>
  );
};

export default VerticalMenu;