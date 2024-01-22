import React, {Dispatch, SetStateAction} from 'react';
import {
  ArrowTop,
  ArrowTopLight,
  OpeningBtn,
  OpeningBtnLight,
} from '@/public/images';
import Image from 'next/image';
import {useTheme} from '@/context/themeContext';
export default function DreamCar({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const {theme} = useTheme();

  return (
    <div className='dc_ctr'>
      <div className={`relative`}>
        <p className='dc_title'>
          Tell us about your <span className='redline'>dream car</span>
        </p>
      </div>
      <div className='absolute bottom-0'>
        <div
          className='relative flex justify-center cursor-pointer'
          onClick={() => setStep(1)}
        >
          <Image
            src={theme === 'dark' ? ArrowTop : ArrowTopLight}
            className={`absolute top-[10px] w-[40px] h-[12px]`}
            alt='ArrowTop'
          />
          <Image
            src={theme === 'dark' ? OpeningBtn : OpeningBtnLight}
            alt='OpeningBtn'
          />
        </div>
      </div>
    </div>
  );
}
