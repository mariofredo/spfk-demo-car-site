import React, {Dispatch, SetStateAction} from 'react';
import Image from 'next/image';
import {ArrowLeftRed} from '@/public/images';

export default function Header({
  step,
  setStep,
}: {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const listQuestion = [
    {
      question: 'What type car',
      markedRed: 'do you like?',
      options: ['Sedan', 'Coupe', 'SUV', 'Truck'],
      type: 'horizontal',
    },
    {
      question: 'If your car had a personality,',
      markedRed: 'what would it be?',
      options: [
        'Adventurous and ready for off-road exploration.',
        'Reliable and practical, always there when needed.',
        'Sophisticated and elegant, turning heads wherever it goes.',
      ],
      type: 'vertical',
    },
  ];
  return (
    <div className='grid grid-cols-2 pt-[106px]'>
      <div className='flex justify-between items-center px-[78px]'>
        <Image
          src={ArrowLeftRed}
          alt='ArrowLeftRed'
          className='h-[20px] w-[10px] cursor-pointer'
          onClick={() => {
            if (step > 1) setStep(step - 1);
          }}
        />
        <p className='text-[32px] text-right'>
          {listQuestion[step - 1].question}{' '}
          <span className='header_redline'>
            {listQuestion[step - 1].markedRed}
          </span>
        </p>
      </div>
      <div
        className={`flex  ${
          listQuestion[step - 1].type === 'horizontal'
            ? 'flex-row justify-evenly items-center'
            : 'flex-col items-start justify-between gap-[15px]'
        } `}
      >
        {listQuestion[step - 1].options.map((option) => (
          <>
            {listQuestion[step - 1].type === 'horizontal' && (
              <div className='header_option'>
                <input
                  id={option}
                  type='radio'
                  name='option'
                  value={option}
                  onClick={() => setStep(step + 1)}
                />
                <label htmlFor={option} className='option_label'>
                  {option}
                </label>
              </div>
            )}
            {listQuestion[step - 1].type === 'vertical' && (
              <div className='header_option_ver'>
                <input
                  id={option}
                  type='radio'
                  name='option'
                  value={option}
                  // onClick={() => setStep(step + 1)}
                />
                <span className='checkmark'></span>
                <label htmlFor={option} className='option_label'>
                  {option}
                </label>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
