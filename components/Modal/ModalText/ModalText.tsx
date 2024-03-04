import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import Image from 'next/image';
import '../Modal.css';
import {CloseIcon, DownloadCircle} from '@/public/images';
import {useCar} from '@/context';
export const ModalText = ({
  setShowModalText,
}: {
  setShowModalText: Dispatch<SetStateAction<boolean>>;
}) => {
  const {uniqueId} = useCar();
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const handleSendRecommendations = useCallback(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/recommendations/save`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          u_id: uniqueId,
        }),
      }
    );
    if (response.ok) {
      const {data} = await response.json();
      if (data.code === 404) {
        alert('Unique ID not found');
      } else {
        setShowModalText(false);
      }
    }
  }, [email, uniqueId]);
  const validateEmail = (email: string) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };
  return (
    <div className='mdl_bd'>
      <div className='mdl_text_ctr'>
        <Image
          src={CloseIcon}
          alt='close_icon'
          className='w-[20px] h-[20px] absolute top-[10px] right-[10px] cursor-pointer'
          onClick={() => setShowModalText(false)}
        />
        <div className='mdl_text_title'>Enter Your Email Here</div>
        <input
          type='text'
          name='email'
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setIsValid(validateEmail(e.target.value));
          }}
          className='mdl_text_input'
          placeholder='Enter your email here'
        />
        <div className='mdl_btn_ctr'>
          <button
            className='mdl_btn_save'
            onClick={() => {
              console.log(isValid, 'isvalid');
              console.log('clicked');
              // handleSendRecommendations();
            }}
            disabled={!isValid}
          >
            Save
            <Image
              src={DownloadCircle}
              className='ml-[15px] max-[480px]:w-[15px] max-[480px]:h-[15px] min-[481px]:w-[17.5px] min-[481px]:h-[17.5px]'
              alt='save_btn'
            />
          </button>
        </div>
      </div>
    </div>
  );
};
