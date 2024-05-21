"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import hero2 from '@/public/hero2.jpg'
import { useRouter } from 'next/navigation'
function Hero() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center pb-10 mx-auto min-[1024px]:mt-20" id="inicio">
      <div className='flex flex-col justify-center items-center gap-2 pb-4'>
        <h3 className='text-xl text-center px-10 h-20 border-2 border-yellow-300 flex just items-center'>Una herramienta para cuando tienes la motivación, pero te faltan las ideas.</h3>
        <div className='flex gap-10 py-3'>
          <div className='rounded-full bg-yellow-300 w-20 h-20 sm:w-28 sm:h-28 flex items-center px-4 sm:px-7 dark:text-black'>
            <div >Cuando quieras</div>
          </div>
          <div className='rounded-full bg-yellow-300 w-20 h-20 sm:w-28 sm:h-28 flex items-center px-4 sm:px-8 dark:text-black'>
            <div >Donde quieras</div>
          </div>
          <div className='rounded-full bg-yellow-300 w-20 h-20 sm:w-28 sm:h-28 flex items-center px-4 sm:px-8 dark:text-black'>
            <div >Como quieras</div>
          </div>
        </div>
        <Button className='mt-3' onClick={()=> router.push('/empezar')}>Empezar</Button>
      </div>

      
    </div>
  )
}

export default Hero