import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { ChangeEvent, useState } from 'react';

const Calories = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [calories, setCalories] = useState(0);

  const handleCalculate = () => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum)) {
      alert('Introduce datos válidos para la edad, el peso y la altura.');
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
    setCalories(calculatedCalories);
  };

  const handleGender = (value: string) => {
    setGender(value);
  };

  const handleActivity = (value: string) => {
    setActivityLevel(value);
  };

  const handleAge = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const ageNum = Math.min(Math.max(parseInt(value), 0), 100);
    setAge(ageNum.toString());
  };

  const handleWeight = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const weightNum = Math.min(Math.max(parseInt(value), 0), 100);
    setWeight(weightNum.toString());
  };

  const handleHeight = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const heightNum = Math.min(Math.max(parseInt(value), 0), 100);
    setHeight(heightNum.toString());
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Calculadora de calorías</h2>
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
        />
        <Input
          type="number"
          placeholder="Peso (kg)"
          min="1"
          max="100"
          value={weight}
          onChange={handleWeight}
        />
        <Input
          type="number"
          placeholder="Altura (cm)"
          min="0"
          max="100"
          value={height}
          onChange={handleHeight}
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
        <button onClick={handleCalculate} className="bg-blue-500 text-white py-2 px-4 rounded">Calcular Calorías</button>
        {calories !== 0 && (
          <div className="mt-4">
            <p>Calorías Necesarias: {calories} kcal/día</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calories;
