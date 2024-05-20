"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import hero2 from '@/public/hero2.jpg'
import { useRouter } from 'next/navigation'
function Hero() {
  const router = useRouter()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center pb-10 mx-auto" id="inicio">
      <div className='flex flex-col justify-center items-center gap-2 pb-4'>
        <h3 className='text-xl text-center px-10'>Una herramienta para cuando tienes la motivación, pero te faltan las ideas.</h3>
        <div className='flex gap-10 py-3'>
          
          <div className='rounded-full bg-yellow-300 w-20 h-20 flex items-center px-3'>
            <div >Cuando quieras</div>
          </div>
          <div className='rounded-full bg-yellow-300 w-20 h-20 flex items-center px-4'>
            <div >Donde quieras</div>
          </div>
          <div className='rounded-full bg-yellow-300 w-20 h-20 flex items-center px-4'>
            <div >Como quieras</div>
          </div>
        </div>
        <Button onClick={()=> router.push('/empezar')}>Empezar</Button>
      </div>

      <Image src={hero2} alt='Una foto en la que aparece un cajón de madera, una kettelbel y un balón medicinal.' className='h-80 min-[1400px]:h-[350px]'/>
    </div>
  )
}

export default Hero