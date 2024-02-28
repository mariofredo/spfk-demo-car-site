'use client';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import {SelectedCarItem} from '@/types/car';
import {AddCircle} from '@/public/images';
import {useCar} from '@/context';
export const FinalCard = ({
  data,
  selected,
  isCompare,
  setShowModalCompare,
}: {
  data: SelectedCarItem;
  selected: boolean;
  isCompare: boolean;
  setShowModalCompare: Dispatch<SetStateAction<boolean>>;
}) => {
  const {setSelectedCar, setTab} = useCar();
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const handleGetListComparison = async (category_level_2_id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comparison-list`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({category_level_2_id}),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setSelectedCar(data.data);
      // setTab(2);
    }
  };
  const handleOpenModalCompare = useCallback(
    async (id: number) => {
      await handleGetListComparison(id);
      await setShowModalCompare(true);
    },
    [selected]
  );
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

  return (
    <div
      className={`lc_fc_ctr ${selected ? 'selected' : ''}${
        !isCompare ? 'carlist' : ''
      }`}
    >
      <div className='w-full max-[767px]:h-[120px] min-[768px]:h-[130px]  flex items-center justify-center'>
        <Image
          className='relative top-[-25px] w-full'
          width={400}
          height={120}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${data.image}`}
          alt='CarOne'
        />
      </div>
      <div className='lc_fc_body'>
        <div className='lc_fc_title'>
          {data.company_brand_name} <br />
          {data.category_level_1_name}
          {!isCompare && (
            <>
              <br />
              {data.category_level_2_name}
            </>
          )}
        </div>
        <div className='lc_fc_price'>{data.price}</div>

        <div className='lc_fc_list_ctr'>
          {data.specs.map((item) =>
            viewportWidth < 768 && selected ? (
              <div className='fc_list_ctr'>
                <div className='fc_list_spec'>
                  <p title={item.spec_name} className='fc_list_spec_text'>
                    {item.spec_name}
                  </p>
                </div>
                <div className='fc_list_spec_item'>
                  <p title={item.content} className='fc_list_spec_item_text'>
                    {item.content}
                  </p>
                </div>
              </div>
            ) : (
              <p title={item.content} className='fc_list_item'>
                <span className='fc_list_item_text'> {item.content}</span>
              </p>
            )
          )}
        </div>
        {!isCompare && (
          <div className='lc_fc_card_btn_ctr'>
            <button
              className='lc_fc_card_btn'
              onClick={() => handleOpenModalCompare(data.category_level_2_id)}
            >
              Compare{' '}
              <Image
                className='ml-[15px] max-[480px]:w-[15px] max-[480px]:h-[15px]  min-[481px]:w-[20px] min-[481px]:h-[20px]'
                src={AddCircle}
                alt='addIcon'
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
