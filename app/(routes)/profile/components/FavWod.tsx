import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FavWod = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/get-favorites')
      .then(response => {
        setFavorites(response.data.favorites);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {favorites.length === 0 ? (
        <p>Todavía no has guardado ningún WOD como favorito</p>
      ) : (
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}>
              <p>{favorite.type} - {favorite.time} minutos</p>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavWod;
