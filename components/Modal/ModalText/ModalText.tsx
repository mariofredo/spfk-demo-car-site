import {Dispatch, SetStateAction} from 'react';
import Image from 'next/image';
import '../Modal.css';
import {DownloadCircle} from '@/public/images';
export const ModalText = ({
  setShowModalText,
}: {
  setShowModalText: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className='mdl_bd' onClick={() => setShowModalText(false)}>
      <div className='mdl_text_ctr'>
        <div className='mdl_text_title'>Enter Your Email Here</div>
        <input
          type='text'
          className='mdl_text_input'
          placeholder='Enter your email here'
        />
        <div className='mdl_btn_ctr'>
          <button className='mdl_btn_save'>
            Save
            <Image
              src={DownloadCircle}
              className='ml-[15px] max-[480px]:w-[15px] max-[480px]:h-[15px]  min-[481px]:w-[17.5px] min-[481px]:h-[17.5px]'
              alt='save_btn'
            />
          </button>
        </div>
      </div>
    </div>
  );
};
