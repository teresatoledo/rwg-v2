"use client"
import { Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'
import { ModeToggle } from './ModeToggle'
import { useRouter } from 'next/navigation'

function Header() {
  const router = useRouter()
  return (
    <header className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
      {/* <Image src={} alt='RWG logo' onClick={()=> router.push('/')}/> */}
      <p>Logo</p>
      <div className="items-center justify-between hidden sm:flex"><HeaderDesktop/></div>
      <div className="flex sm:hidden"><HeaderMobile/></div>
      <div className="flex items-center justify-between gap-2 sm:gap-7">
        <a href='https://www.linkedin.com/in/teresatoledo' target='_blank'><Linkedin /></a>
        <a href='https://github.com/teresatoledo' target='_blank'><Github /></a>
        <a href='mailto:teresatoledolara@gmail.com'><Mail /></a>
        <ModeToggle/>
      </div>
    </header>
  )
}

export default Header