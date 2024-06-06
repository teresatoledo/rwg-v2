"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface PopupProps {
  onClose: () => void;
  text: string,
  button: string,
  buttonPath: string
}

function Popup({ onClose, text, button, buttonPath }: PopupProps) {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-blue-200 p-6 rounded-md shadow-md">
        <div className='flex justify-between'>
          <h4 className="text-xl mb-2">¡Buen trabajo!</h4>
          <X className='cursor-pointer' onClick={onClose}/>
        </div>
        <p className="mb-4">{text}</p>
        <Button onClick={() => router.push(buttonPath)} className="mr-2">{button}</Button>
      </div>
    </div>
  );
}

export default Popup;
