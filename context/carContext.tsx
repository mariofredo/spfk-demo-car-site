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
  selectedCar: SelectedCar;
  setSelectedCar: Dispatch<SetStateAction<SelectedCar>>;
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  companyBrand: string;
  setCompanyBrand: Dispatch<SetStateAction<string>>;
  questionBatch: number;
  setQuestionBatch: Dispatch<SetStateAction<number>>;
  uniqueId: string;
  setUniqueId: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
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
  selectedCar: {
    competitor: [],
    recommendation: {
      category_level_1_id: 0,
      category_level_1_name: '',
      category_level_2_id: 0,
      category_level_2_name: '',
      company_brand_name: '',
      image: '',
      price: 0,
      specs: [],
    },
  },
  setSelectedCar: () => {},
  tab: 1,
  setTab: () => {},
  companyBrand: '',
  setCompanyBrand: () => {},
  questionBatch: 0,
  setQuestionBatch: () => {},
  uniqueId: '',
  setUniqueId: () => {},
  loading: false,
  setLoading: () => {},
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
  const [selectedCar, setSelectedCar] = useState<SelectedCar>({
    recommendation: {
      company_brand_name: '',
      category_level_1_id: 0,
      category_level_1_name: '',
      category_level_2_id: 0,
      category_level_2_name: '',
      image: '',
      price: 0,
      specs: [],
    },
    competitor: [],
  });
  const [tab, setTab] = useState<number>(1);
  const [companyBrand, setCompanyBrand] = useState<string>('');
  const [questionBatch, setQuestionBatch] = useState<number>(0);
  const [uniqueId, setUniqueId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
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
    loading,
    setLoading,
  };
  return <CarContext.Provider value={ctx}>{children}</CarContext.Provider>;
}

export const useCar = () => useContext(CarContext);
