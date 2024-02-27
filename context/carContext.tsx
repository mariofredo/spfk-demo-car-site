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
  question: Question;
  setQuestion: Dispatch<SetStateAction<Question>>;
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
  companyBrand: string;
  setCompanyBrand: Dispatch<SetStateAction<string>>;
  questionBatch: number;
  setQuestionBatch: Dispatch<SetStateAction<number>>;
  uniqueId: string;
  setUniqueId: Dispatch<SetStateAction<string>>;
}

const CarContext = createContext<CarCtxProps>({
  cars: [],
  setCars: () => {},
  question: {data: {content: '', id: 0}, choices: []},
  setQuestion: () => {},
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
  companyBrand: '',
  setCompanyBrand: () => {},
  questionBatch: 0,
  setQuestionBatch: () => {},
  uniqueId: '',
  setUniqueId: () => {},
});

export function CarContextProvider({children}: {children: React.ReactNode}) {
  const [cars, setCars] = useState<Car[]>([]);
  const [question, setQuestion] = useState<Question>({
    data: {
      content: '',
      id: 0,
    },
    choices: [],
  });
  const [answeredQuestion, setAnsweredQuestion] = useState<AnsweredData[]>([]);
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [firstFetch, setFirstFetch] = useState<boolean>(true);
  const [finish, setFinish] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<
    SelectedCar | null | undefined
  >({
    recommendation: {
      company_brand_name: 'Toyota',
      image: 'uploads/category_level_2/glx-4x4-mt-1707019268.png',
      category_level_1_name: 'MPV',
      category_level_2_name: 'Avanza',
      category_level_1_id: 1,
      category_level_2_id: 1,
      price: '200000000',
    },
    competitor: [
      {
        company_brand_name: 'Toyota',
        image: 'uploads/category_level_2/glx-4x4-mt-1707019268.png',
        category_level_1_name: 'MPV',
        category_level_2_name: 'Avanza',
        category_level_1_id: 1,
        category_level_2_id: 1,
        price: '200000000',
      },
      {
        company_brand_name: 'Toyota',
        image: 'uploads/category_level_2/glx-4x4-mt-1707019268.png',
        category_level_1_name: 'MPV',
        category_level_2_name: 'Avanza',
        category_level_1_id: 1,
        category_level_2_id: 1,
        price: '200000000',
      },
    ],
  });
  const [tab, setTab] = useState<number>(2);
  const [companyBrand, setCompanyBrand] = useState<string>('');
  const [questionBatch, setQuestionBatch] = useState<number>(0);
  const [uniqueId, setUniqueId] = useState<string>('');
  const ctx = {
    cars,
    setCars,
    question,
    setQuestion,
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
    companyBrand,
    setCompanyBrand,
    questionBatch,
    setQuestionBatch,
    uniqueId,
    setUniqueId,
  };
  return <CarContext.Provider value={ctx}>{children}</CarContext.Provider>;
}

export const useCar = () => useContext(CarContext);
