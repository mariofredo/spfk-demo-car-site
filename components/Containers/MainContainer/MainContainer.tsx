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
import {ModalForm, ModalText} from '@/components';
export default function MainContainer() {
  const [step, setStep] = useState(0);
  const [isSubmitFirstStep, setIsSubmitFirstStep] = useState(false);
  const [showModalText, setShowModalText] = useState(false);
  const {
    cars,
    setCars,
    answeredQuestion,
    setAnsweredQuestion,
    questionNum,
    setQuestionNum,
    setFirstFetch,
    firstFetch,
    setFinish,
    finish,
    setTab,
    tab,
  } = useCar();
  const {theme} = useTheme();
  const handleReset = useCallback(() => {
    setStep(0);
    setCars([]);
    setQuestionNum(0);
    setAnsweredQuestion([]);
    setFirstFetch(true);
    setFinish(false);
    setTab(1);
    setIsSubmitFirstStep(false);
  }, [
    cars,
    step,
    answeredQuestion,
    questionNum,
    finish,
    firstFetch,
    tab,
    isSubmitFirstStep,
  ]);

  return (
    <div
      className={`mc_ctr  ${
        step >= 1 ? 'cursor-pointer' : 'max-h-screen overflow-hidden'
      }`}
      onClick={() => {
        if (step !== 1 && isSubmitFirstStep) setStep(1);
      }}
    >
      <Image
        className={`logo ${step == 0 ? 'active' : 'inactive'} `}
        src={theme === 'dark' ? Mitsubishi : MitsubishiLight}
        alt='Mitsubishi'
      />

      <button
        className={`btn_reset ${step >= 1 ? 'active' : 'inactive'}`}
        onClick={handleReset}
      ></button>
      {step === 0 && <DreamCar />}
      {!isSubmitFirstStep && (
        <ModalForm setIsSubmitFirstStep={setIsSubmitFirstStep} />
      )}
      {showModalText && <ModalText setShowModalText={setShowModalText} />}
      <Header step={step} setStep={setStep} />
      <ListCar
        step={step}
        setStep={setStep}
        setShowModalText={setShowModalText}
      />
    </div>
  );
}
