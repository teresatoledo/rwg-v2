export interface Exercise {
  name: string;
  link: string;
  focus: 'haltero' | 'gimnasticos' | 'endurance';
  level: string[];
}
export const exercises: Exercise[] = [
  {
    name: 'Squat snatch',
    link: "https://www.youtube.com/watch?v=4v02go3uTBc&ab_channel=CrossFitSANTIAGO",
    focus: 'haltero',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Power snatch',
    link: "https://www.youtube.com/watch?v=TL8SMp7RdXQ",
    focus: 'haltero',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Squat clean',
    link: "https://www.youtube.com/watch?v=Ty14ogq_Vok",
    focus: 'haltero',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Power clean',
    link: "https://www.youtube.com/watch?v=KwYJTpQ_x5A",
    focus: 'haltero',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Clean and jerk',
    link: "https://www.youtube.com/watch?v=PjY1rH4_MOA",
    focus: 'haltero',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Push jerk',
    link: "https://www.youtube.com/watch?v=VrHNJXoSyXw",
    focus: 'haltero',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Split jerk',
    link: "https://www.youtube.com/watch?v=GUDkOtraHHY",
    focus: 'haltero',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'STOH',
    link: "https://www.youtube.com/watch?v=UUcXwF4shCg",
    focus: 'haltero',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'GTOH',
    link: "https://www.youtube.com/watch?v=5nyasj1quW0",
    focus: 'haltero',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Dumbell snatch',
    link: "https://www.youtube.com/watch?v=3mlhF3dptAo",
    focus: 'haltero',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Dumbell clean',
    link: "https://www.youtube.com/watch?v=CUaxieWW0tw",
    focus: 'haltero',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Pull ups',
    link: "https://www.youtube.com/watch?v=lzRo-4pq_AY",
    focus: 'gimnasticos',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Chest to bar',
    link: "https://www.youtube.com/watch?v=p9Stan68FYM",
    focus: 'gimnasticos',
    level: ['intermedio', 'avanzado']
  },
  {
    name: 'Bar muscle ups',
    link: "https://www.youtube.com/watch?v=OCg3UXgzftc",
    focus: 'gimnasticos',
    level: ['avanzado']
  },
  {
    name: 'Toes to bar',
    link: "https://www.youtube.com/watch?v=_03pCKOv4l4",
    focus: 'gimnasticos',
    level: ['intermedio', 'avanzado']
  },
  {
    name: 'Knee to elbow',
    link: "https://www.youtube.com/watch?v=L_RsyHdDsBQ",
    focus: 'gimnasticos',
    level: ['principiante']
  },
  {
    name: 'Pull over',
    link: "https://www.youtube.com/watch?v=faJDYEZmueM",
    focus: 'gimnasticos',
    level: ['intermedio', 'avanzado']
  },
  {
    name: 'HSPU',
    link: "https://www.youtube.com/watch?v=InRvHNUOlSs",
    focus: 'gimnasticos',
    level: ['intermedio', 'avanzado']
  },
  {
    name: 'Pike up',
    link: "https://www.youtube.com/watch?v=x7_I5SUAd00",
    focus: 'gimnasticos',
    level: ['principiante']
  },
  {
    name: 'Strict HSPU',
    link: "https://www.youtube.com/watch?v=0wDEO6shVjc",
    focus: 'gimnasticos',
    level: ['intermedio', 'avanzado']
  },
  {
    name: 'HSW',
    link: "https://www.youtube.com/watch?v=I5p2VVDupq8",
    focus: 'gimnasticos',
    level: ['avanzado']
  },
  {
    name: 'Calorías',
    link: '#',
    focus: 'endurance',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Wall ball',
    link: "https://www.youtube.com/watch?v=fpUD0mcFp_0",
    focus: 'endurance',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Thursters',
    link: "https://www.youtube.com/watch?v=L219ltL15zk",
    focus: 'endurance',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'SU',
    link: "https://www.youtube.com/watch?v=hCuXYrTOMxI",
    focus: 'endurance',
    level: ['principiante']
  },
  {
    name: 'DU',
    link: "https://www.youtube.com/watch?v=-tF3hUsPZAI",
    focus: 'endurance',
    level: ['intermedio', 'avanzado']
  },
  {
    name: 'Devil press',
    link: "https://www.youtube.com/watch?v=81wWS0rAaDk",
    focus: 'endurance',
    level: ['principiante', 'intermedio', 'avanzado']
  },
  {
    name: 'Burpees',
    link: "https://www.youtube.com/watch?v=auBLPXO8Fww",
    focus: 'endurance',
    level: ['principiante', 'intermedio', 'avanzado']
  },
]
