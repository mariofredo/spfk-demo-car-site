'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';

import {Car, SelectedCar} from '@/types/car';
import {AnsweredData, Question} from '@/types/question';
interface CarCtxProps {
  cars: Car[];
  setCars: Dispatch<SetStateAction<Car[]>>;
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  answeredQuestion: AnsweredData[];
  setAnsweredQuestion: Dispatch<SetStateAction<AnsweredData[]>>;
  questionNum: number;
  setQuestionNum: Dispatch<SetStateAction<number>>;
  firstFetch: boolean;
  setFirstFetch: Dispatch<SetStateAction<boolean>>;
  finish: boolean;
  setFinish: Dispatch<SetStateAction<boolean>>;
  selectedCar: SelectedCar | null | undefined;
  setSelectedCar: Dispatch<SetStateAction<SelectedCar | null | undefined>>;
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}

const CarContext = createContext<CarCtxProps>({
  cars: [],
  setCars: () => {},
  questions: [],
  setQuestions: () => {},
  answeredQuestion: [],
  setAnsweredQuestion: () => {},
  questionNum: 0,
  setQuestionNum: () => {},
  firstFetch: true,
  setFirstFetch: () => {},
  finish: false,
  setFinish: () => {},
  selectedCar: null,
  setSelectedCar: () => {},
  tab: 1,
  setTab: () => {},
});

export function CarContextProvider({children}: {children: React.ReactNode}) {
  const [cars, setCars] = useState<Car[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answeredQuestion, setAnsweredQuestion] = useState<AnsweredData[]>([]);
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [firstFetch, setFirstFetch] = useState<boolean>(true);
  const [finish, setFinish] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<
    SelectedCar | null | undefined
  >(null);
  const [tab, setTab] = useState<number>(1);
  const ctx = {
    cars,
    setCars,
    questions,
    setQuestions,
    answeredQuestion,
    setAnsweredQuestion,
    questionNum,
    setQuestionNum,
    firstFetch,
    setFirstFetch,
    finish,
    setFinish,
    selectedCar,
    setSelectedCar,
    tab,
    setTab,
  };
  return <CarContext.Provider value={ctx}>{children}</CarContext.Provider>;
}

export const useCar = () => useContext(CarContext);
