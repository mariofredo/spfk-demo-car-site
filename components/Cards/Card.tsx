import React from 'react';
import Image from 'next/image';
import {CarOne, AddCircle, CarInfo} from '@/public/images';
export default function Card() {
  return (
    <div className='lc_card_ctr'>
      <Image
        src={CarOne}
        alt='CarOne'
        className='relative top-[-30px] right-[-20px] w-[110%] max-w-none'
      />
      <div className='lc_card_body'>
        <div className='lc_card_title'>
          Mitsubishi <br />
          Pajero Sport
        </div>
        <div className='lc_card_type'>SUV</div>
        <div className='lc_card_price'>$83,000</div>
        <div className='lc_card_btn_ctr'>
          <button className='lc_card_btn'>
            Compare{' '}
            <Image
              className='ml-[15px] w-[20px] h-[20px]'
              src={AddCircle}
              alt='addIcon'
            />
          </button>
          <Image className='w-[25px] h-[25px]' src={CarInfo} alt='carInfo' />
        </div>
      </div>
    </div>
  );
}
