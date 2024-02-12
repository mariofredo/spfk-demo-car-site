import React, {Dispatch, SetStateAction} from 'react';

export default function DreamCar() {
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
