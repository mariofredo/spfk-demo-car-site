'use client';

import './MainContainer.css';
import React, {useCallback, useState} from 'react';
import {Mitsubishi, MitsubishiLight} from '@/public/images';
import Image from 'next/image';
import DreamCar from '@/components/Items/MainContainer/DreamCar';
import Header from '@/components/Header/Header';
import ListCar from '@/components/Items/MainContainer/ListCar';
import {useTheme} from '@/context/themeContext';
import {useCar} from '@/context/carContext';
import ModalForm from '@/components/Modal/ModalForm/ModalForm';
export default function MainContainer() {
  const [step, setStep] = useState(0);
  const [isSubmitFirstStep, setIsSubmitFirstStep] = useState(false);
  const {
    cars,
    setCars,
    answeredQuestion,
    setAnsweredQuestion,
    questionNum,
    setQuestionNum,
    setFirstFetch,
  } = useCar();
  const {theme} = useTheme();
  const handleReset = useCallback(() => {
    setStep(0);
    setCars([]);
    setQuestionNum(0);
    setAnsweredQuestion([]);
    setFirstFetch(true);
  }, [cars, step, answeredQuestion, questionNum]);

  return (
    <div
      className={`mc_ctr ${theme === 'dark' ? 'dark' : 'light'} ${
        step >= 1 ? 'overflow-y-scroll cursor-pointer' : 'overflow-y-hidden'
      }`}
      onClick={() => {
        if (step !== 1 && isSubmitFirstStep) setStep(1);
      }}
    >
      <div className='absolute top-0 left-0 w-full flex justify-between  p-[20px]'>
        <Image
          className=' w-[150px] h-[50px]'
          src={theme === 'dark' ? Mitsubishi : MitsubishiLight}
          alt='Mitsubishi'
        />
        {step === 1 && (
          <button
            className='border-2 text-red-600 border-red-600 px-[15px] py-[2.5px] rounded-[5px] mt-7'
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      {step === 0 && <DreamCar setStep={setStep} />}
      {!isSubmitFirstStep && (
        <ModalForm setIsSubmitFirstStep={setIsSubmitFirstStep} />
      )}

      <Header step={step} setStep={setStep} />
      <ListCar step={step} setStep={setStep} />
    </div>
  );
}
