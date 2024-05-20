"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import arrow from '@/public/arrow.svg'
import Image from "next/image"
function Steps() {
  const router = useRouter()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 justify-evenly gap-3 sm:ml-4 pb-4 md:pb-0 min-[1400px]:h-[350px]">
      <div className="flex flex-col items-center justify-center gap-2 border border-slate-500 rounded-md py-2 mx-2 ">
        <h4 className="text-lg font-bold">Paso 1:</h4>
        <div className="h-30 flex flex-col items-center">
          <p>Haz clic en el botón empezar.</p>
          <Button onClick={()=> router.push('/empezar')}>Empezar</Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border border-slate-500 rounded-md mx-2 text-center ">
        <h4 className="text-lg font-bold">Paso 2:</h4>
        <p className="h-30 px-10">Selecciona el tipo de entrenamiento, el foco principal, el tiempo del que dispones y tu nivel para generar el entrenamiento.</p>
      </div>
      <div className="flex flex-col items-center justify-center border border-slate-500 rounded-md mx-2 text-center  px-3">
        <h4 className="text-lg font-bold">Paso 3:</h4>
        <p>Genera el entrenamiento, consula los ejercicios sobre los que tengas dudas haciendo clic sobre cada uno y pon el temporizador en marcha.</p>
      </div>
    </div>
  )
}

export default Steps