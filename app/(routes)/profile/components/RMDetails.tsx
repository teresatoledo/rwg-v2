import React, { useState, useEffect } from 'react';
import { getCookie } from '@/utils/cookies';

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
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = getCookie('token');
    console.log('Stored Token:', token); // Debugging token retrieval
    setStoredToken(token);

    if (token) {
      fetchRMData(token);
    }
  }, []);

  const fetchRMData = async (token: string) => {
    try {
      const response = await fetch(`/api/rmRecords?exerciseId=${exercise.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRmData(data);
      } else {
        console.error('Failed to fetch RM data');
      }
    } catch (error) {
      console.error('Error fetching RM data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRmData({
      ...newRmData,
      [name]: value
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleAddRM = async () => {
    if (!storedToken) {
      console.error('No token found');
      return;
    }

    const response = await fetch('/api/rmRecords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        exerciseId: exercise.id,
        ...newRmData,
      })
    });

    if (response.ok) {
      const data = await response.json();
      setRmData(data);
      // Resetear el formulario después de guardar
      setNewRmData({
        date: '',
        repetitions: undefined,
        kg: undefined,
        observations: ''
      });
    } else {
      console.error('Failed to save RM data');
    }
  };

  return (
    <div className='mt-4'>
      {rmData ? (
        <div className='mb-4'>
          <p><strong>Fecha:</strong> {formatDate(rmData.date)}</p>
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
