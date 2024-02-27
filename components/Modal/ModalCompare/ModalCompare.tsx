import {Dispatch, SetStateAction} from 'react';
import Image from 'next/image';
import {useCar} from '@/context';

import '../Modal.css';
import {CloseIcon} from '@/public/images';
export const ModalCompare = ({
  setShowModalCompare,
}: {
  setShowModalCompare: Dispatch<SetStateAction<boolean>>;
}) => {
  const {cars} = useCar();
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
          <div className='col-span-1 pt-[60px]'>
            <div className='mdl_spec'>
              <div className='mdl_spec_title'>CAR TYPE</div>
              <div className='mdl_spec_list'>
                <div className='mdl_spec_item'>
                  <span>Body Type</span>
                </div>
                <div className='mdl_spec_item'>Passenger</div>
                <div className='mdl_spec_item'>Suited Area</div>
                <div className='mdl_spec_item'>Driven By</div>
                <div className='mdl_spec_item'>Road Type</div>
                <div className='mdl_spec_item'>Primary Use</div>
              </div>
            </div>
          </div>
          <div className='col-span-1 pt-[60px]'>
            <div className='mdl_card selected'>
              <div className='w-full max-[767px]:h-[120px] min-[768px]:h-[60px]  flex items-center justify-center'>
                <Image
                  className='relative top-[-25px] w-full'
                  width={400}
                  height={120}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/category_level_2/gls-cvt-1707191429.png`}
                  alt='CarOne'
                />
              </div>
              <div className='mdl_fc_body'>
                <div className='mdl_fc_title'>
                  {'Mitsubishi'} <br />
                  {'Pajero Sport'}
                  <br />
                  {'GLS 4x2 AT'}
                </div>
                <div className='mdl_fc_price'>{'12312313123'}</div>

                <div className='mdl_fc_list_ctr'>
                  {/* {data.specs.map((item) =>
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
          )} */}
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                </div>
                {/* {!isCompare && (
                  <div className='mdl_fc_card_btn_ctr'>
                    <button
                      className='lc_fc_card_btn'
                      onClick={() => {
                        // handleGetListComparison(data.category_level_2_id);
                        setShowModalCompare(true);
                      }}
                    >
                      Compare{' '}
                      <Image
                        className='ml-[15px] max-[480px]:w-[15px] max-[480px]:h-[15px]  min-[481px]:w-[20px] min-[481px]:h-[20px]'
                        src={AddCircle}
                        alt='addIcon'
                      />
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <div className='col-span-1 pt-[60px]'>
            <div className='mdl_card '>
              <div className='w-full max-[767px]:h-[120px] min-[768px]:h-[60px]  flex items-center justify-center'>
                <Image
                  className='relative top-[-25px] w-full'
                  width={400}
                  height={120}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/category_level_2/gls-cvt-1707191429.png`}
                  alt='CarOne'
                />
              </div>
              <div className='mdl_fc_body'>
                <div className='mdl_fc_title'>
                  {'Mitsubishi'} <br />
                  {'Pajero Sport'}
                  <br />
                  {'GLS 4x2 AT'}
                </div>
                <div className='mdl_fc_price'>{'12312313123'}</div>

                <div className='mdl_fc_list_ctr'>
                  {/* {data.specs.map((item) =>
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
          )} */}
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                  <p title={'LALALA'} className='fc_list_item'>
                    <span className='fc_list_item_text'> {'LALALA'}</span>
                  </p>
                </div>
                {/* {!isCompare && (
                  <div className='mdl_fc_card_btn_ctr'>
                    <button
                      className='lc_fc_card_btn'
                      onClick={() => {
                        // handleGetListComparison(data.category_level_2_id);
                        setShowModalCompare(true);
                      }}
                    >
                      Compare{' '}
                      <Image
                        className='ml-[15px] max-[480px]:w-[15px] max-[480px]:h-[15px]  min-[481px]:w-[20px] min-[481px]:h-[20px]'
                        src={AddCircle}
                        alt='addIcon'
                      />
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <div className='col-span-1 pt-[60px]'>
            <p className='why_text mb-[20px]'>
              Why <span>Pajero Sport?</span>
            </p>
            <ul className='list-outside list-disc pl-[20px]'>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>
                Consequuntur distinctio earum praesentium saepe accusamus minima
                similique maxime iste ratione aperiam eos sunt, nostrum ut
                voluptatum officiis necessitatibus excepturi molestias quae.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
