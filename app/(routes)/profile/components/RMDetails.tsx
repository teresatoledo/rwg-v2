import React, { useState } from 'react';

interface Exercise {
  id: number;
  name: string;
}

interface RMData {
  date: string;
  repetitions: number;
  kg: number;
  observations: string;
}

interface RMDetailsProps {
  exercise: Exercise;
}

const RMDetails: React.FC<RMDetailsProps> = ({ exercise }) => {
  const [rmData, setRmData] = useState<RMData | null>(null);
  const [newRmData, setNewRmData] = useState<Partial<RMData>>({
    date: '',
    repetitions: undefined,
    kg: undefined,
    observations: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRmData({
      ...newRmData,
      [name]: value
    });
  }

  const handleAddRM = () => {
    // Aquí iría la lógica para guardar en la base de datos
    setRmData(newRmData as RMData);
    // Resetear el formulario después de guardar
    setNewRmData({
      date: '',
      repetitions: undefined,
      kg: undefined,
      observations: ''
    });
  }

  return (
    <div className='mt-4'>
      {rmData ? (
        <div className='mb-4'>
          <p><strong>Fecha:</strong> {rmData.date}</p>
          <p><strong>Repeticiones:</strong> {rmData.repetitions}</p>
          <p><strong>Kg:</strong> {rmData.kg}</p>
          <p><strong>Observaciones:</strong> {rmData.observations}</p>
        </div>
      ) : (
        <p className='mb-4'>Todavía no has guardado ningún RM de {exercise.name}</p>
      )}
      <div>
        <input 
          type='date' 
          name='date' 
          value={newRmData.date || ''} 
          onChange={handleChange}
          className='border p-2 rounded mb-2 w-full'
        />
        <input 
          type='number' 
          name='repetitions' 
          placeholder='Repeticiones' 
          value={newRmData.repetitions === undefined ? '' : newRmData.repetitions} 
          onChange={handleChange}
          className='border p-2 rounded mb-2 w-full'
        />
        <input 
          type='number' 
          name='kg' 
          placeholder='Kg' 
          value={newRmData.kg === undefined ? '' : newRmData.kg} 
          onChange={handleChange}
          className='border p-2 rounded mb-2 w-full'
        />
        <input 
          type='text' 
          name='observations' 
          placeholder='Observaciones' 
          value={newRmData.observations || ''} 
          onChange={handleChange}
          className='border p-2 rounded mb-2 w-full'
        />
        <button onClick={handleAddRM} className='bg-blue-500 text-white p-2 rounded w-full'>Añadir</button>
      </div>
    </div>
  );
};

export default RMDetails;
