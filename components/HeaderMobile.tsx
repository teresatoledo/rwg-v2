import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Separator } from './ui/separator'

function HeaderMobile() {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu/>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col justify-center items-center'>
        <Link href="/" className='block py-1'>Inicio</Link>
        <Separator/>
        <Link href="/entrenar" className='block py-1'>Entrenar</Link>
        <Separator/>
        <Link href="/faq" className='block py-1'>Preguntas frecuentes</Link>
      </PopoverContent>
    </Popover>
  )
}

export default HeaderMobile