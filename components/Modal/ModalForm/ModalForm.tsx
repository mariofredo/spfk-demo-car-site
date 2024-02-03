import {useCar} from '@/context/carContext';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
export default function ModalForm({
  setIsSubmitFirstStep,
}: {
  setIsSubmitFirstStep: Dispatch<SetStateAction<boolean>>;
}) {
  const {setQuestions} = useCar();
  const [payload, setPayload] = useState({
    company_brand: '',
    batch: '',
  });
  const getQuestions = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/question-list`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.code === 200) {
        setQuestions(data.data);
        setIsSubmitFirstStep(true);
      }
    }
  };
  useEffect(() => {
    console.log(payload);
  }, [payload]);
  return (
    <div className='mdl_bd'>
      <div className='mdl_form_ctr'>
        <div className='mdl_form_input_ctr'>
          <label htmlFor='selectBrand'>Choose Company Brand</label>
          <select
            name='company_brand'
            id='selectBrand'
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPayload({...payload, [e.target.name]: e.target.value})
            }
            value={payload.company_brand}
          >
            <option value='' disabled>
              Choose Your Brand
            </option>
            <option value='1'>Mitsubishi</option>
          </select>
        </div>
        <div className='mdl_form_input_ctr'>
          <label htmlFor='selectBrand'>Choose Your Question Batch</label>
          <select
            name='batch'
            id='selectBrand'
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPayload({...payload, [e.target.name]: e.target.value})
            }
            value={payload.batch}
          >
            <option value='' disabled>
              Choose Your Batch
            </option>
            <option value='1'>1</option>
          </select>
        </div>
        <button className='mdl_form_btn' onClick={() => getQuestions()}>
          Submit
        </button>
      </div>
    </div>
  );
}
