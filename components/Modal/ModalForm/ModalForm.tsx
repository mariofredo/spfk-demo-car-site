import {useCar} from '@/context';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import '../Modal.css';
export const ModalForm = ({
  setIsSubmitFirstStep,
}: {
  setIsSubmitFirstStep: Dispatch<SetStateAction<boolean>>;
}) => {
  const {companyBrand, setCompanyBrand, questionBatch, setQuestionBatch} =
    useCar();

  const [listBatch, setListBatch] = useState<{batch: number}[]>([]);
  const [listBrand, setListBrand] = useState<{id: number; name: string}[]>([]);

  const getQuestionBatchList = async (company_brand_id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/question-batch-list`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({company_brand_id}),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setListBatch(data.data);
    }
  };
  const getBrandList = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brand-list`,
      {
        method: 'POST',
      }
    );
    if (response.ok) {
      const data = await response.json();
      setListBrand(data.data);
    }
  };
  useEffect(() => {
    getBrandList();
  }, []);
  useEffect(() => {
    if (companyBrand) getQuestionBatchList(parseInt(companyBrand));
  }, [companyBrand]);
  return (
    <div className='mdl_bd'>
      <div className='mdl_form_ctr'>
        <div className='mdl_form_input_ctr'>
          <label htmlFor='selectBrand'>Choose Company Brand</label>
          <select
            name='company_brand'
            id='selectBrand'
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCompanyBrand(e.target.value)
            }
            value={companyBrand}
          >
            <option value='' disabled>
              Choose Your Brand
            </option>
            {listBrand.map((key) => (
              <option key={key.id} value={key.id}>
                {key.name}
              </option>
            ))}
          </select>
        </div>
        <div className='mdl_form_input_ctr'>
          <label htmlFor='selectBrand'>Choose Your Question Set</label>
          <select
            name='batch'
            id='selectBrand'
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setQuestionBatch(parseInt(e.target.value))
            }
            value={questionBatch}
            disabled={!companyBrand}
          >
            <option value='0' disabled>
              Choose Your Question Set
            </option>
            {listBatch.map((key) => (
              <option key={key.batch} value={key.batch}>
                {key.batch}
              </option>
            ))}
          </select>
        </div>
        <button
          className='mdl_form_btn'
          disabled={!questionBatch || !companyBrand}
          onClick={() => setIsSubmitFirstStep(true)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
