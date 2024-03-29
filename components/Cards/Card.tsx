import Image from 'next/image';
import {AddCircle, CarInfo} from '@/public/images';
import {Car} from '@/types/car';
import {useCar} from '@/context/carContext';
import {formatRupiah} from '@/utils';
export const Card = ({
  brand_name,
  category,
  category_level_2_name,
  category_level_1_id,
  category_level_2_id,
  price,
  image,
  category_level_1_name,
}: Car) => {
  const {cars, setSelectedCar, setTab, finish} = useCar();
  const handleGetListComparison = async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comparison-list`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setSelectedCar(data.data);
      setTab(2);
    }
  };
  return (
    <div className='lc_card_ctr'>
      <div className='w-full h-[171px] flex items-center justify-center'>
        <Image
          width={200}
          height={200}
          src={`${image}`}
          alt='CarOne'
          className='relative max-[480px]:top-[-50px] min-[481px]:top-[-30px] right-[-20px] w-[110%]  max-w-none'
        />
      </div>
      <div className='lc_card_body'>
        <div className='lc_card_title'>
          {brand_name} <br />
          {category_level_1_name}
        </div>
        <div className='lc_card_type'>{category_level_2_name}</div>
        <div className='lc_card_price'>{formatRupiah(price)}</div>
        <div className='lc_card_btn_ctr'>
          {finish && (
            <button
              className='lc_card_btn'
              onClick={() => handleGetListComparison(category_level_2_id)}
            >
              Compare{' '}
              <Image
                className='ml-[15px] max-[480px]:w-[15px] max-[480px]:h-[15px]  min-[481px]:w-[20px] min-[481px]:h-[20px]'
                src={AddCircle}
                alt='addIcon'
              />
            </button>
          )}
          {/* <Image className='w-[25px] h-[25px]' src={CarInfo} alt='carInfo' /> */}
        </div>
      </div>
    </div>
  );
};
