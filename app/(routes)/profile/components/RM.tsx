import { Input } from '@/components/ui/input';
import React, { useState, ChangeEvent } from 'react';
import { exercises } from '../../empezar/components/Exercises';
import { ChevronDown } from 'lucide-react';
import RMDetails from './RMDetails';

interface Exercise {
  id: number;
  name: string;
}

const RM: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exercises);
  const [expandedExerciseId, setExpandedExerciseId] = useState<number | null>(null);

  const handleRM = (id: number) => {
    setExpandedExerciseId(expandedExerciseId === id ? null : id);
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    const filtered = exercises.filter(exercise => 
      exercise.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredExercises(filtered);
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 hidden sm:flex">Registro de RM</h2>
      <Input 
        type='text' 
        placeholder='Buscar ejercicio' 
        value={searchValue} 
        onChange={handleSearch}
      />
      <div className='max-h-96 sm:w-[420px] overflow-scroll overflow-x-hidden pt-4'>
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className='border-2 border-slate-300 rounded-md p-4 m-2'>
            <div className='text-md flex justify-between'>
              <p>{exercise.name}</p>
              <ChevronDown className='cursor-pointer' onClick={() => handleRM(exercise.id)}/>
            </div>
            {expandedExerciseId === exercise.id && <RMDetails exercise={exercise} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RM;
