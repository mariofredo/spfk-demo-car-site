import {Dispatch, SetStateAction} from 'react';
import Image from 'next/image';
import {useCar} from '@/context';

import '../Modal.css';
import {AddCircle, CloseIcon, DownloadCircle} from '@/public/images';
export const ModalCompare = ({
  setShowModalCompare,
  setShowModalText,
}: {
  setShowModalText: Dispatch<SetStateAction<boolean>>;
  setShowModalCompare: Dispatch<SetStateAction<boolean>>;
}) => {
  const {cars, setTab, selectedCar} = useCar();
  return (
    <div className='mdl_bd'>
      <div className='mdl_compare_ctr'>
        <Image
          src={CloseIcon}
          alt='close_icon'
          className='w-[20px] h-[20px] absolute top-[10px] right-[10px] cursor-pointer'
          onClick={() => setShowModalCompare(false)}
        />
        <div className='grid grid-cols-4 gap-[20px]'>
          <div className='col-span-1 pt-[60px] pb-[40px]'>
            <div className='mdl_spec'>
              <div className='mdl_spec_title'>CAR TYPE</div>
              <div className='mdl_spec_list'>
                {selectedCar?.recommendation.specs.map((item) => (
                  <div className='mdl_spec_item'>
                    <span>{item.spec_name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='col-span-1 pt-[60px] pb-[40px]'>
            <div className='mdl_card selected'>
              <div className='w-full max-[767px]:h-[120px] min-[768px]:h-[60px]  flex items-center justify-center'>
                <Image
                  className='relative top-[-25px] w-full'
                  width={400}
                  height={120}
                  src={selectedCar.recommendation.image}
                  alt='CarOne'
                />
              </div>
              <div className='mdl_fc_body'>
                <div className='mdl_fc_title'>
                  {selectedCar?.recommendation.company_brand_name} <br />
                  {selectedCar?.recommendation.category_level_1_name}
                  <br />
                  {selectedCar?.recommendation.category_level_2_name}
                </div>
                <div className='mdl_fc_price'>
                  {selectedCar?.recommendation.price}
                </div>

                <div className='mdl_fc_list_ctr'>
                  {selectedCar?.recommendation.specs.map((item) => (
                    <p title={item.content} className='fc_list_item'>
                      <span title={item.content} className='fc_list_item_text'>
                        {' '}
                        {item.content}
                      </span>
                    </p>
                  ))}
                </div>

                <div className='mdl_fc_card_btn_ctr'>
                  <button
                    className='mdl_fc_card_btn'
                    onClick={() => {
                      setTab(2);
                      setShowModalCompare(false);
                    }}
                  >
                    Compare
                    <br />
                    for more
                    <Image
                      className='ml-[15px] max-[480px]:w-[15px] max-[480px]:h-[15px]  min-[481px]:w-[20px] min-[481px]:h-[20px]'
                      src={AddCircle}
                      alt='addIcon'
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-1 pt-[60px] pb-[40px]'>
            <div className='mdl_card '>
              <div className='w-full max-[767px]:h-[120px] min-[768px]:h-[60px]  flex items-center justify-center'>
                <Image
                  className='relative top-[-25px] w-full'
                  width={400}
                  height={120}
                  src={`${selectedCar.competitor[0].image}`}
                  alt='CarOne'
                />
              </div>
              <div className='mdl_fc_body'>
                <div className='mdl_fc_title'>
                  {selectedCar.competitor[0].company_brand_name} <br />
                  {selectedCar.competitor[0].category_level_1_name}
                  <br />
                  {selectedCar.competitor[0].category_level_2_name}
                </div>
                <div className='mdl_fc_price'>
                  {selectedCar.competitor[0].price}
                </div>

                <div className='mdl_fc_list_ctr'>
                  {selectedCar.competitor[0].specs.map((item) => (
                    <p title={item.content} className='fc_list_item'>
                      <span className='fc_list_item_text'> {item.content}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-1 pt-[60px] pb-[40px]'>
            <div className='relative h-full'>
              <p className='why_text mb-[20px]'>
                Why <span>Pajero Sport?</span>
              </p>
              <ul className='list-outside list-disc pl-[20px]'>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Consequuntur distinctio earum praesentium saepe accusamus
                  minima similique maxime iste ratione aperiam eos sunt, nostrum
                  ut voluptatum officiis necessitatibus excepturi molestias
                  quae.
                </li>
              </ul>
              <div className='absolute bottom-0 right-0'>
                <button
                  className='mdl_fc_card_btn'
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
        </div>
      </div>
    </div>
  );
};
