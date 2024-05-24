import React from 'react'

function HeaderDesktop() {
  return (
    <div>
      <nav>
        <ul className='flex gap-4'>
          <li className='bg-[#E8F6FF] rounded-md w-12 text-center'>
            <a href="/">Inicio</a>
          </li>
          <li className='bg-[#E8F6FF] rounded-md w-20 text-center'>
            <a href="/empezar">Entrenar</a>
          </li>
          <li className='bg-[#E8F6FF] rounded-md w-40 text-center'>
            <a href="/faq">Preguntas frecuentes</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default HeaderDesktop