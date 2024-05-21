"use client";
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import React, { useState, MouseEvent, useEffect } from 'react';
import { Exercise, exercises } from './components/Exercises';
import {  Drawer,  DrawerClose,  DrawerContent,  DrawerDescription,  DrawerFooter,  DrawerHeader,  DrawerTitle,  DrawerTrigger} from "@/components/ui/drawer"
import { X } from 'lucide-react';

function getYouTubeID(url: string): string {
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return (match && match[1]) || '';
}

function Page() {
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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            if (interval) clearInterval(interval);
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
    if (type === '' || focus === '' || time === '') {
      setError('');
    } else {
      setError('hidden');
      setResultBox('');
      randomExercise();
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
    if (type === 'emom' && parseInt(finalTime) > 0) {
      finalExercises = finalExercises.map((exercise, index) => {
        const repetitions = Math.floor(Math.random() * (10-5+1)) + 5;
        return {
          ...exercise,
          repetitions: repetitions,
        }
      })
    } else if (type === 'forTime') {
      finalExercises.forEach((exercise) => {
        exercise.repetitions = Math.floor(Math.random() * 20) + 1;
      });
    } else if (type === 'forQuality') {
      finalExercises.forEach((exercise) => {
        exercise.repetitions = Math.floor(Math.random() * 5) + 1;
      });
    }
    setSelectedExercises(finalExercises)
  }
  const handleStartTimer = () => {
    setTimer(parseInt(finalTime) * 60); // Convierte finalTime a segundos
    setIsRunning(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-9 justify-evenly items-center pt-10'>
        <div className='flex flex-col gap-7'>
          <Select value={type} onValueChange={handleType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="emom">EMOM</SelectItem>
                <SelectItem value="amrap">AMRAP</SelectItem>
                <SelectItem value="forTime">For time</SelectItem>
                <SelectItem value="forQuality">For quality</SelectItem>
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
        <div className={`border-2 border-yellow-300 p-4 ${resultBox}`}>
          <div className='flex justify-center gap-3'>
            {/* <p>Fav</p> */}
            <p>{finalTime} minutos</p>
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
      <div className={`flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-10 mt-9 ${resultBox}`}>
            <p className='text-2xl mb-2'>{formatTime(timer)}</p>
            <Button onClick={handleStartTimer}>Iniciar temporizador</Button>
          </div>
    </div>
  );
}

export default Page;
