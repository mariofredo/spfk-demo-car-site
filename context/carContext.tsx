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
  selectedCar: SelectedCar;
  setSelectedCar: Dispatch<SetStateAction<SelectedCar>>;
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
  selectedCar: {
    recommendation: {
      company_brand_name: '',
      category_level_1_id: 0,
      category_level_1_name: '',
      category_level_2_id: 0,
      category_level_2_name: '',
      image: '',
      price: 0,
      specs: [
        {
          spec_name: '',
          content: '',
        },
      ],
    },
    competitor: [
      {
        company_brand_name: '',
        category_level_1_id: 0,
        category_level_1_name: '',
        category_level_2_id: 0,
        category_level_2_name: '',
        image: '',
        price: 0,
        specs: [
          {
            spec_name: '',
            content: '',
          },
        ],
      },
    ],
  },
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
  const [selectedCar, setSelectedCar] = useState<SelectedCar>({
    recommendation: {
      company_brand_name: '',
      category_level_1_id: 0,
      category_level_1_name: '',
      category_level_2_id: 0,
      category_level_2_name: '',
      image: '',
      price: 0,
      specs: [
        {
          spec_name: '',
          content: '',
        },
      ],
    },
    competitor: [
      {
        company_brand_name: '',
        category_level_1_id: 0,
        category_level_1_name: '',
        category_level_2_id: 0,
        category_level_2_name: '',
        image: '',
        price: 0,
        specs: [
          {
            spec_name: '',
            content: '',
          },
        ],
      },
    ],
  });
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
