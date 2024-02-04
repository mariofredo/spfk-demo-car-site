import React from 'react';
import Image from 'next/image';
import {CarOne, AddCircle, CarInfo} from '@/public/images';
import {Car} from '@/types/car';
export default function Card({
  brand,
  category,
  name,
  category_level_1_id,
  category_level_2_id,
  price,
  spec,
  image,
}: Car) {
  return (
    <div className='lc_card_ctr'>
      <div className='w-full h-[171px] flex items-center justify-center'>
        <Image
          width={200}
          height={200}
          src={image}
          alt='CarOne'
          className='relative top-[-30px] right-[-20px] w-[110%]  max-w-none'
        />
      </div>
      <div className='lc_card_body'>
        <div className='lc_card_title'>
          {brand} <br />
          {category}
        </div>
        <div className='lc_card_type'>{name}</div>
        <div className='lc_card_price'>{price}</div>
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
