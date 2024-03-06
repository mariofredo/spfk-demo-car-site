import {AnsweredData, SelectedCarItem} from '@/types';
import React, {Dispatch, SetStateAction} from 'react';
import {FinalCard} from '@/components';
import {DownloadCircle} from '@/public/images';
import Image from 'next/image';

export const CompareMobile = ({
  recommendation,
  competitor,
  setShowModalCompare,
  setShowModalText,
  answeredQuestion,
  handleReset,
}: {
  recommendation: SelectedCarItem;
  competitor: SelectedCarItem[];
  setShowModalCompare: Dispatch<SetStateAction<boolean>>;
  setShowModalText: Dispatch<SetStateAction<boolean>>;
  answeredQuestion: AnsweredData[];
  handleReset: () => void;
}) => {
  return (
    <>
      <div className='mdl_compare_fltr'>
        <div className='mdl_compare_fltr_item'>
          <div className='mark_line_red'>Compare Cars</div>
        </div>
        <div className='mdl_compare_fltr_item flex justify-end gap-[20px]'>
          <button onClick={() => setShowModalCompare(false)}>Back</button>
          <button
            onClick={() => {
              handleReset();
              setShowModalCompare(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className='w-full grid grid-cols-2'>
        <div className='col-span-1 pl-[20px] pt-[60px] pr-[10px]'>
          <div className='sticky top-[125px]'>
            <FinalCard
              data={recommendation}
              selected={true}
              isCompare={true}
              setShowModalCompare={setShowModalCompare}
            />
          </div>
        </div>
        <div className='col-span-1 pl-[10px] pt-[60px] pr-[20px] flex gap-x-[20px] overflow-x-scroll '>
          {competitor.map((item) => (
            <FinalCard
              key={item.category_level_2_id}
              data={item}
              selected={false}
              isCompare={true}
              setShowModalCompare={setShowModalCompare}
            />
          ))}
        </div>
      </div>
      <div className='w-full grid grid-cols-2 pb-[90px]'>
        <div className='col-span-1 pl-[20px] pr-[10px]'>
          <div className='relative flex flex-col gap-[20px] mt-[20px]'>
            <p className='why_text '>
              Why <span>{recommendation.category_level_1_name}?</span>
            </p>
            <ul className='list-outside list-disc pl-[20px]'>
              {answeredQuestion.map((data) => (
                <li key={data.id}>{data.tag}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='col-span-1 pl-[10px] pr-[20px]'>
          <div className='static mt-[20px] w-full'>
            <button
              className='mdl_fc_card_btn w-full'
              onClick={() => {
                setShowModalText(true);
              }}
            >
              Save the result
              <Image
                className='ml-[15px] max-[480px]:w-[15px] max-[480px]:h-[15px]  min-[481px]:w-[20px] min-[481px]:h-[20px]'
                src={DownloadCircle}
                alt='DownloadCircle'
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
