'use client';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {Mitsubishi} from '@/public/images';
import Image from 'next/image';
import {
  DreamCar,
  ListCar,
  ModalForm,
  ModalText,
  Sidebar,
  ModalCompare,
} from '@/components';
import {useCar} from '@/context/carContext';
import './MainContainer.css';

export const MainContainer = () => {
  const [step, setStep] = useState(0);
  const [isSubmitFirstStep, setIsSubmitFirstStep] = useState(false);
  const [showModalText, setShowModalText] = useState(false);
  const [showModalCompare, setShowModalCompare] = useState(false);
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
    uniqueId,
    setUniqueId,
    companyBrand,
    setCompanyBrand,
    questionBatch,
    setQuestionBatch,
    question,
    setQuestion,
  } = useCar();
  const handleReset = useCallback(async () => {
    await setIsSubmitFirstStep(false);
    setStep(0);
    setCars([]);
    setQuestion({data: {content: '', id: 0}, choices: []});
    setQuestionNum(0);
    setAnsweredQuestion([]);
    setFirstFetch(true);
    setFinish(false);
    setTab(1);
    setUniqueId('');
    setCompanyBrand('');
    setQuestionBatch(0);
  }, [
    cars,
    step,
    question,
    answeredQuestion,
    questionNum,
    finish,
    firstFetch,
    tab,
    isSubmitFirstStep,
    questionBatch,
    uniqueId,
    companyBrand,
  ]);

  return (
    <div
      className={`mc_ctr  ${
        step >= 1 ? '' : 'max-h-screen overflow-hidden cursor-pointer'
      }`}
      onClick={() => {
        if (step <= 1 && isSubmitFirstStep) setStep(1);
      }}
    >
      <Image
        className={`logo ${step == 0 ? 'active' : 'inactive'} `}
        src={Mitsubishi}
        alt='Mitsubishi'
      />

      {step === 0 && <DreamCar />}
      {step === 1 && (
        <div className='relative w-full min-[769px]:grid min-[769px]:grid-cols-10 pt-[90px] max-[768px]:overflow-y-scroll max-[768px]:h-screen'>
          <button
            className={`btn_reset ${step >= 1 ? 'active' : 'inactive'}`}
            onClick={() => handleReset()}
          ></button>
          <div
            className={`${
              tab === 1 ? 'min-[769px]:col-span-4' : 'min-[769px]:col-span-3'
            }`}
          >
            <Sidebar setShowModalText={setShowModalText} />
          </div>
          <div
            className={`${
              tab === 1 ? 'min-[769px]:col-span-6' : 'min-[769px]:col-span-7'
            }`}
          >
            <ListCar
              step={step}
              setStep={setStep}
              setShowModalText={setShowModalText}
              setShowModalCompare={setShowModalCompare}
            />
          </div>
        </div>
      )}

      {!isSubmitFirstStep && (
        <ModalForm setIsSubmitFirstStep={setIsSubmitFirstStep} />
      )}

      {showModalCompare && (
        <ModalCompare
          setShowModalText={setShowModalText}
          setShowModalCompare={setShowModalCompare}
          handleReset={handleReset}
        />
      )}
      {showModalText && <ModalText setShowModalText={setShowModalText} />}
    </div>
  );
};
