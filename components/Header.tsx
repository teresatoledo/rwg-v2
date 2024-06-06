"use client"
import { Github, Linkedin, Mail, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import logo from '@/public/logo.png'

function Header() {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl ">
      <Image className='bg-white w-12 rounded-sm' src={logo} alt='RWG logo' onClick={()=> router.push('/')}/>
      <div className="items-center justify-between hidden sm:flex"><HeaderDesktop/></div>
      <div className="flex sm:hidden"><HeaderMobile/></div>
      <div className="flex items-center justify-between gap-2 sm:gap-7">
      <Link href={'/login'}> <User/> </Link>
      </div>
    </header>
  );
}

export default Header;
