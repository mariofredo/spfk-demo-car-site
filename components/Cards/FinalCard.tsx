import React from 'react';
import Image from 'next/image';
import {CarOne} from '@/public/images';
import {SelectedCarItem} from '@/types/car';
export default function FinalCard({
  data,
  selected,
}: {
  data: SelectedCarItem;
  selected: boolean;
}) {
  return (
    <div className={`lc_fc_ctr ${selected && 'selected'}`}>
      <div className='w-full h-[171px] flex items-center justify-center'>
        <Image
          className='relative top-[-25px]'
          width={200}
          height={200}
          src={data.image}
          alt='CarOne'
        />
      </div>
      <div className='lc_fc_body'>
        <div className='lc_fc_title'>
          {data.company_brand_name} <br />
          {data.category_level_1_name}
        </div>
        <div className='lc_fc_price'>{data.price}</div>

        <div className='lc_fc_list_ctr'>
          {data.specs.map((item) => (
            <div className='fc_list_item'>{item.content}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
