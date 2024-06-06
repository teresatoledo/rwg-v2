import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { ChangeEvent, useState } from 'react';

const Calories = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');
  const [calories, setCalories] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCalculate = () => {
    // Reset error message
    setErrorMessage('');

    // Validate all fields are filled
    if (!gender || !age || !weight || !height || !activityLevel || !goal) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum)) {
      setErrorMessage('Introduce datos válidos para la edad, el peso y la altura.');
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum);
    } else {
      bmr = 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum);
    }

    let calculatedCalories;
    switch (activityLevel) {
      case 'sedentary':
        calculatedCalories = Math.round(bmr * 1.2);
        break;
      case 'lightlyActive':
        calculatedCalories = Math.round(bmr * 1.375);
        break;
      case 'moderatelyActive':
        calculatedCalories = Math.round(bmr * 1.55);
        break;
      case 'veryActive':
        calculatedCalories = Math.round(bmr * 1.725);
        break;
      case 'extraActive':
        calculatedCalories = Math.round(bmr * 1.9);
        break;
      default:
        calculatedCalories = 0;
    }

    // Adjust calories based on goal
    if (goal === 'loseWeight') {
      calculatedCalories -= 200;
    } else if (goal === 'gainMuscle') {
      calculatedCalories += 200;
    }

    setCalories(calculatedCalories);
  };

  const handleGender = (value: string) => {
    setGender(value);
  };

  const handleActivity = (value: string) => {
    setActivityLevel(value);
  };

  const handleGoal = (value: string) => {
    setGoal(value);
  };

  const handleAge = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const ageNum = Math.min(Math.max(parseInt(value), 0), 100);
    setAge(ageNum.toString());
  };

  const handleWeight = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const weightNum = Math.min(Math.max(parseInt(value), 0), 200);
    setWeight(weightNum.toString());
  };

  const handleHeight = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const heightNum = Math.min(Math.max(parseInt(value), 0), 230);
    setHeight(heightNum.toString());
  };

  return (
    <div className='flex flex-col justify-center items-center mx-auto'>
      <h2 className="text-lg font-semibold mb-4 ">Calculadora de calorías</h2>
      <div className="flex flex-col space-y-4">
        <Select value={gender} onValueChange={handleGender}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Selecciona el género" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="male">Masculino</SelectItem>
              <SelectItem value="female">Femenino</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Edad"
          min="1"
          max="100"
          value={age}
          onChange={handleAge}
          className='w-[250px]'
        />
        <Input
          type="number"
          placeholder="Peso (kg)"
          min="1"
          max="200"
          value={weight}
          onChange={handleWeight}
          className='w-[250px]'
        />
        <Input
          type="number"
          placeholder="Altura (cm)"
          min="0"
          max="230"
          value={height}
          onChange={handleHeight}
          className='w-[250px]'
        />
        <Select value={activityLevel} onValueChange={handleActivity}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Selecciona el nivel de actividad" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="sedentary">Sedentario</SelectItem>
              <SelectItem value="lightlyActive">Poco Activo (1-3 días/semana)</SelectItem>
              <SelectItem value="moderatelyActive">Moderadamente Activo (3-5 días/semana)</SelectItem>
              <SelectItem value="veryActive">Muy Activo (6-7 días/semana)</SelectItem>
              <SelectItem value="extraActive">Extra Activo (2 veces/día)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={goal} onValueChange={handleGoal}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Selecciona tu objetivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="loseWeight">Bajar de peso</SelectItem>
              <SelectItem value="maintenance">Mantenimiento</SelectItem>
              <SelectItem value="gainMuscle">Ganar masa muscular</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={handleCalculate} className='w-[250px]'>Calcular calorías</Button>
        {calories !== 0 && (
          <div>
            <p className='mb-8'><span className='font-bold'>Calorías Necesarias:</span> {calories} kcal/día</p>
          </div>
        )}
        {errorMessage && (
          <p className='text-red-500'>{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Calories;
