import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className='flex gap-2 justify-between items-center px-5 h-10'>
      <div>
        Teresa Toledo | 2024
      </div>
      <div className="flex items-center justify-between gap-1 sm:gap-3">
        <a href='https://www.linkedin.com/in/teresatoledo'><Linkedin className='h-5 bg-white rounded-sm'  target='_blank'/></a>
        <a href='https://github.com/teresatoledo'><Github className='h-5 bg-white rounded-sm' target='_blank'/></a>
        <a href='mailto:teresatoledolara@gmail.com'><Mail className='h-5 bg-white rounded-sm' /></a>
        
      </div>
    </footer>
  )
}

export default Footer