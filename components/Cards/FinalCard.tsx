import React from 'react';
import Image from 'next/image';
import {CarOne} from '@/public/images';
export default function FinalCard({selected}: {selected: boolean}) {
  return (
    <div className={`lc_fc_ctr ${selected && 'selected'}`}>
      <Image className='relative top-[-25px]' src={CarOne} alt='CarOne' />
      <div className='lc_fc_body'>
        <div className='lc_fc_title'>
          Mitsubishi <br />
          Pajero Sport
        </div>
        <div className='lc_fc_price'>$ 83,000</div>

        <div className='lc_fc_list_ctr'>
          <div className='fc_list_item'>Truck</div>
          <div className='fc_list_item'>4 people</div>
          <div className='fc_list_item'>North</div>
          <div className='fc_list_item'>Chaffeured</div>
          <div className='fc_list_item'>City Driving</div>
          <div className='fc_list_item'>Daily Commute</div>
        </div>
      </div>
    </div>
  );
}
