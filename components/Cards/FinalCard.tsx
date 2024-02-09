'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {SelectedCarItem} from '@/types/car';
export const FinalCard = ({
  data,
  selected,
}: {
  data: SelectedCarItem;
  selected: boolean;
}) => {
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    // Set initial viewport dimensions
    handleResize();

    // Add event listener to update viewport dimensions on window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    console.log(viewportWidth, 'viewportWidth');
  }, [viewportWidth]);
  return (
    <div className={`lc_fc_ctr ${selected ? 'selected' : ''}`}>
      <div className='w-full  flex items-center justify-center'>
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
          {data.specs.map((item) =>
            viewportWidth < 768 && selected ? (
              <div className='fc_list_ctr'>
                <div className='fc_list_spec'>{item.spec_name}</div>
                <div className='fc_list_spec_item'>{item.content}</div>
              </div>
            ) : (
              <div className='fc_list_item'>{item.content}</div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
