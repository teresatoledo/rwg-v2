import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
interface Exercise {
  name: string;
  repetitions: number;
}

interface Favourite {
  id: string;
  type: string;
  minutes: number;
  exercises: Exercise[];
}

const FavWod = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Recover fav from DB
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favourites');
        if (response.ok) {
          const data = await response.json();
          setFavourites(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener los favoritos del usuario:', error);
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const removeFavourite = async (favouriteId: any) => {
    try {
      const response = await fetch(`/api/favourites?id=${favouriteId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFavourites(favourites.filter(favourite => favourite.id !== favouriteId));
      }
    } catch (error) {

      console.error('Error al eliminar el favorito:', error);
    }
  };

  return (
    <div className='max-h-96 sm:w-[420px] overflow-scroll overflow-x-hidden pt-4'>
      {favourites.length === 0 ? (
        <p>Todavía no has guardado ningún WOD como favorito</p>
      ) : (
        favourites.map((favourite) => (
          <ul key={favourite.id} className='border-2 border-slate-300 rounded-md p-4 m-2'>
            <li className='text-center'>
              <div className='flex justify-between'>
                <p className='font-bold'>{favourite.type} - {favourite.minutes} minutos</p>
                <Trash2 className='w-5 cursor-pointer' onClick={() => removeFavourite(favourite.id)} />
              </div>
              {favourite.exercises.map((exercise, exerciseIndex) => (
                <p key={exerciseIndex}>{exercise.name} - {exercise.repetitions} repeticiones</p>
              ))}
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default FavWod;
