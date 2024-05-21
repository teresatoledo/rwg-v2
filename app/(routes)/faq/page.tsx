import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function Page() {
  const faq = [
    {
      id: 1,
      question: '¿Qué significa cada tipo de entrenamiento?',
      answer: 'EMOM: tendrás que hacer las repeticiones correspondientes de cada ejercicios en un margen de un minuto, el tiempo que sobre es de descanso. AMRAP: tendrás que hacer todas las rondas posibles de los ejercicios dados en el tiempo total, no hay descanso. For time: tendrás que hacer una sola ronda de los ejercicios propuestos. For quality: tendrás que hacer los ejercicios centrándote en la técnica y no en la rapidez, no importan las rondas totales.'
    },
    {
      id: 2,
      question: '¿Qué significa cada tipo de foco?',
      answer: 'Halterofilia: son ejercicios para los que utilizamos una barra y peso adicional, por ejemplo, snatch, clean,jerk... Gimnásticos: son ejercicios para los que utilizamos el peso corporal como, por ejemplo, dominadas, pino o toes to bar. Endurance: son ejercicios enfocados en la resistencia cardiovascular, como, por ejemplo, la carrera, los burpees o los wall ball.'
    },
    {
      id: 3,
      question: '¿Qué conlleva cada nivel?',
      answer: 'La diferencia principal entre los diferentes niveles reside en los diferentes ejercicios de gimnásticos. Los principiantes tendrán pike up, rodillas al pecho y dominadas asistidas, mientras que en el nivel intermedio se incluye HSPU, toes to bar y pull up/chest to bar, y en el nivel avanzado se incluye HSW, bar/ring muscle up.'
    },
    {
      id: 4,
      question: '¿Cómo puedo guardar un entrenamiento si me ha gustado mucho?',
      answer: 'Para poder guardar un entrenamiento tendrás que iniciar sesión antes de generar el entrenamiento y, una vez generado, aparecerá una estrella junto los ejercicios para poder guardarlo.'
    },
    {
      id: 5,
      question: '¿Registrarme tiene algún beneficio adicional?',
      answer: 'Sí, los usuarios registrados podrán acceder a un histórico de sus WOD favoritos, así como un registro de medidas y peso corporal, y de RM. Además podrás calcular la ingesta calórica necesaria según tus objetivos.'
    },
  ]
  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:min-h-[50vh]">
      <div className='flex items-center justify-center px-6 py-2 gap-6 flex-wrap'>
        
          {faq.map(({id, question, answer})=> (
            <Card key={id} className='w-92'>
              <CardHeader className='p-2 text-center'>
                <CardTitle className='sm:text-lg text-wrap'>{question}</CardTitle>
              </CardHeader>
              <CardContent className='text-xs sm:text-sm text-wrap'>
                <p>{answer}</p>
              </CardContent>
            </Card>
        
          ))}
        
      </div>
      
    </div>
  )
}

export default Page