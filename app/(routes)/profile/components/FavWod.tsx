// components/WOD.js

import React from 'react';

const FavWod = ({ favoriteWODs }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">WOD</h2>
      {favoriteWODs.map((wod, index) => (
        <div key={index} className="border rounded p-4 mb-4">
          <h3 className="text-xl font-semibold">{wod.title}</h3>
          <p>{wod.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavWod;
