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
    </div>
  );
}
