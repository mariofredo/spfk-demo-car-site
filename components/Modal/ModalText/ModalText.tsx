import {Dispatch, SetStateAction} from 'react';

export const ModalText = ({
  setShowModalText,
}: {
  setShowModalText: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className='mdl_bd' onClick={() => setShowModalText(false)}>
      <div className='mdl_text_ctr'>
        <div className='mdl_text_title'>Please complete the question...</div>
        <div className='mdl_btn_ctr'>
          <button className='mdl_btn_outline_red'>Okay</button>
        </div>
      </div>
    </div>
  );
};
