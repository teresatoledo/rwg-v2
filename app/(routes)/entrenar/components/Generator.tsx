"use client";
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import { Exercise, exercises } from './Exercises';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Heart, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Howl, Howler } from 'howler';
import Popup from './Popup';
import { getCookie } from '@/utils/cookies';

//YT URL is different from what is needed to embed the video. This function does that URL conversion.
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
  const [pauseButtonText, setPauseButtonText] = useState('Pausar');
  const [timerText, setTimerText] = useState('Iniciar temporizador');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<string>('hidden')
  const [fillHeart, setFillHeart] = useState('')

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
      //If timer is running, it substract a second until it reaches 0, moment in which timer stops, sound is played and popup is shown.
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && !isPaused) {
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
    } else if ((!isRunning || isPaused) && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused]);

  useEffect(() => {
      //If there is a cookie (user is logged in) fav icon appears.
    const token = getCookie('token');
    if (token) {
      setFavourites('');
    } else {
      setFavourites('hidden');
    }
  }, []);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (type === '' || focus === '' || time === '' || level === '') {
      setError('');
    } else {
      setError('hidden');
      setResultBox('');
      setLogin('hidden');
      randomExercise();
      setTimer(parseInt(finalTime) * 60);
      setIsRunning(false);
      setIsPaused(false);
      setPauseButtonText('Pausar');
      setTimerText('Iniciar temporizador');
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
    //Takes the value of the input selected and creates a random number between min (value) and max.
    setResultBox('hidden');
    setTime(value);
    const selectedTime = parseInt(value);
    let min = 0, max = 0;
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
    //Exercises filtered by focus and level. Create a set (there won't be any repeated exercise). Add exercises from other focus, mix the exercises so they aren't separated by focus. Randomised number of repetitions, being 5 the minimum. If EMOM, total number of exercises should be divisible by minutes, if not, it decreases an exercise.
    const availableExercise = exercises.filter(exercise => exercise.focus === focus && exercise.level.includes(level));
    const selectedExercises = new Set<Exercise>();
    availableExercise.forEach((exercise) => {
      selectedExercises.add(exercise);
    });
    const otherFocus = exercises.filter(exercise => exercise.focus !== focus && exercise.level.includes(level));
    otherFocus.forEach((exercise) => {
      selectedExercises.add(exercise);
    });
    const selectedExercisesArray = Array.from(selectedExercises).sort(() => Math.random() - 0.5);
    let finalExercises = selectedExercisesArray.slice(0, Math.floor(Math.random() * (10 - 3 + 1)) + 3).map((exercise) => {
      const repetitions = Math.floor(Math.random() * (10 - 5 + 1) + 5);
      return { exercise, repetitions };
    });
    if (type === 'EMOM') {
      const numMinutes = parseInt(finalTime);
      let numExercises = Math.floor(numMinutes / 1); // Rounded down to have a initial number
      if (numExercises < 5) {
        numExercises = 5;
      }
      while (numExercises % numMinutes !== 0) {
        numExercises++;
      }
      finalExercises = finalExercises.slice(0, numExercises).map((exerciseEntry) => {
        const repetitions = Math.floor(Math.random() * (10 - 5 + 1) + 5);
        return { exercise: exerciseEntry.exercise, repetitions };
      });
    }
    setSelectedExercises(finalExercises);
  };

  const handleStartTimer = () => {
    if (isPaused) {
      setIsPaused(false);
      setIsRunning(true);
      setPauseButtonText('Pausar');
    } else {
      setIsCountdownRunning(true);
      setCountdown(3);
      playSoundStart();
      setPauseButtonText('Pausar');
      setTimerText('Reiniciar');

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
    }
  };

  const handlePauseTimer = () => {
    setIsPaused(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleFavourites = async () => {
    //Saves the wod on DB when clicking fav icon, if everything has been ok, heart is filled black.
    try {
      const token = getCookie('token');
      if (!token) {
        console.error('El usuario no está autenticado');
        return;
      }
  
      const response = await fetch('/api/saveWod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          time: finalTime,
          repetitions: selectedExercises.map(exercise => exercise.repetitions),
          exercises: selectedExercises.map(exercise => exercise.exercise.name),
        }),
      });
  
      if (response.ok) {
        setFillHeart('fill-black')
      } else {
        console.error('Error al guardar los datos del entrenamiento aquí:', response.statusText);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };
  const router = useRouter();
  return (
    <div className="h-screen">
      <div className='flex flex-col sm:flex-row gap-9 justify-center items-center sm:pt-24'>
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
          <Button className='mb-3' onClick={handleClick}>Generar</Button>
          <div className={`${error} text-red-500 font-bold`}>Vaya, parece que te falta algo por seleccionar.</div>
        </div>
        <div className={`border-2 border-blue-300 p-4 ${resultBox}`}>
          <div className='flex justify-center gap-3'>
            {favourites === '' ? <p className='cursor-pointer ' onClick={handleFavourites}><Heart className={`${fillHeart}`}/></p> : <p></p> }
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
                          <Button variant="outline"><X /></Button>
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
                    </DrawerContent>
                  </Drawer>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={`flex flex-col justify-center items-center gap-5 sm:gap-10 mt-12 ${resultBox}`}>
        {isCountdownRunning ? (
          <svg width="100" height="100">
            <circle className="countdown-circle" cx="50" cy="50" r="20" fill="none" strokeWidth="5" stroke="#000" style={{ margin: "5px", padding: "0" }} />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="20">
              {countdown}
            </text>
          </svg>
        ) : (
          <p className='text-2xl'>{formatTime(timer)}</p>
        )}
        <div className='flex gap-3'>
          <Button onClick={handleStartTimer}>{timerText}</Button>
          <Button onClick={handlePauseTimer}>{pauseButtonText}</Button>
        </div>
      </div>
      { favourites === 'hidden' ? <div className={`mt-8 border border-blue-300 sm:flex-col items-center justify-center px-1 text-center sm:h-28 mx-3 sm:w-[570px] sm:mx-auto sm:my-10 rounded-md ${login}`}>
        <p className='dark:text-black p-2'>¿Quieres guardar tus entrenamientos y hacer un seguimiento de tus marcas?</p>
        <Button onClick={() => router.push('/login')} className='mt-3 mb-3 sm:mb-0'>Inicia sesión</Button>
      </div> : <div></div>}
      { favourites === 'hidden' ? (
  showPopup && <Popup onClose={() => setShowPopup(false)} text={'Si quieres acceder a otras funcionalidades como el registro de pesos o una calculadora de macros, inicia sesión.'} button={'Iniciar sesión'} buttonPath={'/login'}/>
) : (
  showPopup && <Popup onClose={() => setShowPopup(false)} text={'No olvides registrar tu progreso en tu perfil'} button={'Ir al perfil'} buttonPath={'/profile'}/>
)}
    </div>
  );
}

export default Generator;
