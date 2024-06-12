import React from 'react'
import { Briefcase, Github, Linkedin, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className='flex gap-2 justify-between items-center px-5 h-10'>
      <div>
        Teresa Toledo | 2024
      </div>
      <div className="flex items-center justify-between gap-1 sm:gap-3">
        <a href='https://www.linkedin.com/in/teresatoledo'  target='_blank'><Linkedin className='h-5 bg-white rounded-sm' /></a>
        <a href='https://github.com/teresatoledo'  target='_blank'><Github className='h-5 bg-white rounded-sm'/></a>
        <a href='mailto:teresatoledolara@gmail.com'><Mail className='h-5 bg-white rounded-sm' /></a>
        <a href='https://teresatoledo.vercel.app/' target='_blank'><Briefcase className='h-5 bg-white rounded-sm' /></a>
        
      </div>
    </footer>
  )
}

export default Footer