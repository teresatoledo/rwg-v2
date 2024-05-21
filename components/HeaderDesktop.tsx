import React from 'react'

function HeaderDesktop() {
  return (
    <div>
      <nav>
        <ul className='flex gap-4'>
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="/empezar">Empezar</a>
          </li>
          <li>
            <a href="/faq">Preguntas frecuentes</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default HeaderDesktop