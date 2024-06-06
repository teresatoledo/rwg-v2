import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className='flex gap-2 justify-between items-center px-5 h-10'>
      <div>
        Teresa Toledo | 2024
      </div>
      <div className="flex items-center justify-between gap-1 sm:gap-3">
        <Linkedin className='h-5 bg-white rounded-sm' href='https://www.linkedin.com/in/teresatoledo' target='_blank'/>
        <Github className='h-5 bg-white rounded-sm' href='https://github.com/teresatoledo' target='_blank'/>
        <Mail className='h-5 bg-white rounded-sm' href='mailto:teresatoledolara@gmail.com'/>
      </div>
    </footer>
  )
}

export default Footer