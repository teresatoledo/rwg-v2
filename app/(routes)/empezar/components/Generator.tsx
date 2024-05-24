"use client";
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import React, { useState, MouseEvent, useEffect } from 'react';
import { Exercise, exercises } from './Exercises';
import {  Drawer,  DrawerClose,  DrawerContent,  DrawerDescription,  DrawerFooter,  DrawerHeader,  DrawerTitle,  DrawerTrigger} from "@/components/ui/drawer"
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {Howl, Howler} from 'howler';
import Popup from './Popup';

function getYouTubeID(url: string): string {
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return (match && match[1]) || '';
}

function Generator() {
  
  const [type, setType] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [focus, setFocus] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [error, setError] = useState<string>('hidden');
  const [finalTime, setFinalTime] = useState<string>('');
  const [resultBox, setResultBox] = useState<string>('hidden');
  const [selectedExercises, setSelectedExercises] = useState<{ exercise: Exercise; repetitions: number }[]>([]);
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [login, setLogin] = useState<string>('');
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCountdownRunning, setIsCountdownRunning] = useState<boolean>(false);

  const playSoundStart = () => {
    const sound = new Howl({
      src: ['/start.mp3'],
      autoplay: true, 
      volume: 0.5
    });
  };
  
  const playSoundEnd = () => {
    const sound = new Howl({
      src: ['/final.mp3'],
      autoplay: true,
      volume: 0.5
    });
  };
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            if (interval) clearInterval(interval);
            playSoundEnd();
            setShowPopup(true);
            return 0;
          }
        });
      }, 1000);
    } else if (!isRunning && timer !== 0 && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timer]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (type === '' || focus === '' || time === '' || level === '') {
      setError('');
    } else {
      setError('hidden');
      setResultBox('');
      setLogin('hidden')
      randomExercise();
      setTimer(parseInt(finalTime) * 60); 
    setIsRunning(false);
    }
  };

  const handleType = (value: string) => {
    setType(value);
    setResultBox('hidden');
  };

  const handleFocus = (value: string) => {
    setFocus(value);
    setResultBox('hidden');
  };

  const handleLevel = (value: string) => {
    setLevel(value);
    setResultBox('hidden');
  };

  const handleTime = (value: string) => {
    setResultBox('hidden');
    setTime(value);
    const selectedTime = parseInt(value);
    let min, max;
    if (selectedTime === 5) {
      min = 5;
      max = 10;
    } else if (selectedTime === 11) {
      min = 11;
      max = 15;
    } else if (selectedTime === 16) {
      min = 16;
      max = 20;
    } else if (selectedTime === 21) {
      min = 21;
      max = 25;
    }
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomNumber = random.toString();
    setFinalTime(randomNumber);
    setTimer(random * 60);
  };
  const randomExercise = () => {
    const availableExercise = exercises.filter(exercise => exercise.focus === focus && exercise.level.includes(level));
    const selectedExercises = new Set<Exercise>();
    availableExercise.forEach((exercise) => {
      selectedExercises.add(exercise);
    });
    const otherFocus = exercises.filter(exercise => exercise.focus !== focus && exercise.level.includes(level));
    otherFocus.forEach((exercise) => {
      selectedExercises.add(exercise);
    })
    const selectedExercisesArray = Array.from(selectedExercises).sort(() => Math.random() - 0.5);
    let finalExercises = selectedExercisesArray.slice(0, Math.floor(Math.random() * (10 - 3 + 1)) + 3).map((exercise) => {
      const repetitions = Math.floor(Math.random()* (10- 5 + 1) + 5);
      return {exercise, repetitions}
    });
    if (type === 'EMOM') {
      const numMinutes = parseInt(finalTime);
      let numExercises = Math.floor(numMinutes / 1); // Redondeamos hacia abajo para obtener un número inicial
      
      if (numExercises < 5) {
        numExercises = 5;
      }
      
      // Si el número de ejercicios no es divisible entre el número de minutos,
      // ajustamos el número de ejercicios para que sea divisible
      while (numExercises % numMinutes !== 0) {
        numExercises++;
      }
  
      finalExercises = finalExercises.slice(0, numExercises).map((exerciseEntry) => {
        const repetitions = Math.floor(Math.random()* (10- 5 + 1) + 5);
        return {exercise: exerciseEntry.exercise, repetitions}
      });
    }
  
    setSelectedExercises(finalExercises);
  }
  
  const handleStartTimer = () => {
    setIsCountdownRunning(true);
    setCountdown(3);
    playSoundStart();

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev && prev > 1) {
          return prev - 1;
        } else {
          clearInterval(countdownInterval);
          setIsCountdownRunning(false);
          setCountdown(null);
          setTimer(parseInt(finalTime) * 60);
          setIsRunning(true);
          return null;
        }
      });
    }, 1000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const router = useRouter()
  return (
    <div className="h-screen">
      
      <div className='flex flex-col sm:flex-row gap-9 justify-center items-center pt-24'>
        <div className='flex flex-col gap-7'>
          <Select value={type} onValueChange={handleType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="EMOM">EMOM</SelectItem>
                <SelectItem value="AMRAP">AMRAP</SelectItem>
                <SelectItem value="For time">For time</SelectItem>
                <SelectItem value="For quality">For quality</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={focus} onValueChange={handleFocus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona el foco" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="haltero">Halterofilia</SelectItem>
                <SelectItem value="gimnasticos">Gimnásticos</SelectItem>
                <SelectItem value="endurance">Endurance</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={time} onValueChange={handleTime}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona el tiempo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5-10 minutos</SelectItem>
                <SelectItem value="11">11-15 minutos</SelectItem>
                <SelectItem value="16">16-20 minutos</SelectItem>
                <SelectItem value="21">21-25 minutos</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={handleLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona el nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="principiante">Principiante</SelectItem>
                <SelectItem value="intermedio">Intermedio</SelectItem>
                <SelectItem value="avanzado">Avanzado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col items-center'>
          <Button onClick={handleClick}>Generar</Button>
          <div className={`${error} text-red-500 font-bold`}>Vaya, parece que te falta algo por seleccionar.</div>
        </div>
        <div className={`border-2 border-blue-300 p-4 ${resultBox}`}>
          <div className='flex justify-center gap-3'>
            {/* <p>Fav</p> */}
            <p>{finalTime} minutos</p>
            <p>-</p>
            <p>{type}</p>
          </div>
          <Separator />
          <div>
          <ul className='flex flex-col items-center'>
              {selectedExercises.map((item, index) => (
                <li key={index}>
                  <Drawer>
                    <DrawerTrigger>{item.exercise.name} - {item.repetitions} repeticiones</DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader className='flex justify-between items-center'>
                        <DrawerTitle>{item.exercise.name}</DrawerTitle>
                        <DrawerClose>
                          <Button variant="outline"><X/></Button>
                        </DrawerClose>
                      </DrawerHeader>
                      <div className="p-4">
                        <iframe
                          width="100%"
                          height="315"
                          src={`https://www.youtube.com/embed/${getYouTubeID(item.exercise.link)}`}
                          title={item.exercise.name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <DrawerFooter>
                        
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={`flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-10 my-12 ${resultBox}`}>
  {isCountdownRunning ? (
    <svg width="100" height="100">
      <circle className="countdown-circle" cx="50" cy="50" r="20" fill="none" strokeWidth="5" stroke="#000" style={{ margin: "5px", padding: "0" }} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="20">
        {countdown}
      </text>
    </svg>
  ) : (
    <p className='text-2xl mb-2'>{formatTime(timer)}</p>
  )}
  <Button onClick={handleStartTimer}>Iniciar temporizador</Button>
</div>
        <div className={`border border-blue-300 flex flex-col items-center justify-center h-36 px-1 text-center sm:h-28 mx-3 sm:w-[570px] sm:mx-auto my-10 rounded-md  ${login}`}>
        <p>¿Quieres guardar tus entrenamientos y hacer un seguimiento de tus marcas?</p>
        <Button onClick={() => router.push('/login')} className='mt-3'>Inicia sesión</Button>
      </div>
      {showPopup && <Popup />}
    </div>
  );
}

export default Generator;
