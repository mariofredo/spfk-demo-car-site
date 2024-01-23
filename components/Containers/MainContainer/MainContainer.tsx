'use client';

import {Mitsubishi, MitsubishiLight} from '@/public/images';
import Image from 'next/image';
import React, {useState} from 'react';
import DreamCar from '@/components/Items/MainContainer/DreamCar';
import './MainContainer.css';
import Header from '@/components/Header/Header';
import ListCar from '@/components/Items/MainContainer/ListCar';
import {useTheme} from '@/context/themeContext';

export default function MainContainer() {
  const [step, setStep] = useState(0);
  const {theme} = useTheme();
  return (
    <div
      className={`mc_ctr ${theme === 'dark' ? 'dark' : 'light'} ${
        step >= 1 ? 'overflow-y-scroll' : 'overflow-y-hidden'
      }`}
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
            onClick={() => setStep(0)}
          >
            Reset
          </button>
        )}
      </div>
      {step === 0 && <DreamCar setStep={setStep} />}

      <Header step={step} setStep={setStep} />
      <ListCar step={step} setStep={setStep} />
    </div>
  );
}
