import { Info } from 'lucide-react'
import React from 'react'

function Tooltip() {
  return (
    <div className="relative inline-block group">
      <Info className='w-4 cursor-pointer'/>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black text-white text-center rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-opacity-75">
        Si necesitas ayuda con algún ejercicio, haz clic sobre cada nombre para ver un vídeo explicativo.
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-t-black border-r-8 border-r-transparent border-l-8 border-l-transparent"></div>
      </div>
    </div>
  );
}

export default Tooltip