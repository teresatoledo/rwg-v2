import React from 'react'

function HeaderDesktop() {
  return (
    <div>
      <nav>
        <ul className='flex gap-4'>
          <li className='bg-[#E8F6FF] rounded-sm w-12 text-center shadow-md shadow-black'>
            <a href="/">Inicio</a>
          </li>
          <li className='bg-[#E8F6FF] rounded-sm w-20 text-center shadow-md shadow-black'>
            <a href="/entrenar">Entrenar</a>
          </li>
          <li className='bg-[#E8F6FF] rounded-sm w-40 text-center shadow-md shadow-black'>
            <a href="/faq">Preguntas frecuentes</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default HeaderDesktop