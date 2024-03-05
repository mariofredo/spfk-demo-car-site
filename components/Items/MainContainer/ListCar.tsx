'use client';
import {Card, FinalCard} from '@/components';
import {useScreen} from '@/context';
import {useCar} from '@/context/carContext';
import {Loading} from '@/public/images';
import {Car, SelectedCarItem} from '@/types';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const ListCar = ({
  step,
  setStep,
  setShowModalText,
  setShowModalCompare,
}: {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setShowModalText: Dispatch<SetStateAction<boolean>>;
  setShowModalCompare: Dispatch<SetStateAction<boolean>>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [goUp, setGoUp] = useState(true);
  const [initial, setInitial] = useState(true);
  const {
    cars,
    tab,
    setTab,
    selectedCar,
    setCars,
    setQuestionNum,
    setAnsweredQuestion,
    setFirstFetch,
    setFinish,
    answeredQuestion,
    questionNum,
    finish,
    firstFetch,
    loading,
    setLoading,
  } = useCar();
  const {width} = useScreen();
  const router = useRouter();
  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the multiplier for faster/slower scrolling
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleReset = useCallback(() => {
    setStep(0);
    setCars([]);
    setQuestionNum(0);
    setAnsweredQuestion([]);
    setFirstFetch(true);
    setFinish(false);
    setTab(1);
  }, [cars, step, answeredQuestion, questionNum, finish, firstFetch, tab]);
  const handleAnimation = useCallback(
    (width: number, step: number, goUp: boolean, initial: boolean) => {
      if (width < 769) {
        if (step === 1 && initial) {
          return 'initial';
        } else if (step === 1 && !goUp) return 'active';
        else return 'inactive';
      } else {
        if (step === 1) return 'active';
        else return 'inactive';
      }
    },
    [width, step, goUp, initial]
  );
  return (
    <div className={`lc_ctr ${handleAnimation(width, step, goUp, initial)}`}>
      <div className='lc_wrapper'>
        <div
          className='lc_filters'
          onClick={() => {
            if (initial) setInitial(false);
            setGoUp(!goUp);
          }}
        >
          <div className='lc_filters_txt'>
            {loading ? (
              <Image src={Loading} className='loading_bar' alt='loading' />
            ) : cars.length === 1 ? (
              `${cars.length} Car Match`
            ) : (
              `${cars.length} Cars Match`
            )}
          </div>
          <div className='lc_filters_btn_ctr'>
            <button
              className={`lc_filters_btn ${
                tab === 1 ? 'active' : 'inactive'
              } carlist`}
              onClick={() => setTab(1)}
              disabled={step < 1}
            >
              Car list
            </button>
          </div>
        </div>
        {tab === 1 ? (
          cars.length > 0 ? (
            finish ? (
              <div
                className={`grid max-[480px]:grid-cols-2 max-[769px]:grid-cols-2 min-[769px]:grid-cols-2 max-[480px]:gap-[25px] min-[481px]:gap-[40px] max-[480px]:px-[20px] min-[481px]:px-[50px] py-[20px]`}
              >
                {cars.map(
                  ({
                    brand_name,
                    category_level_2_name,
                    category_level_1_id,
                    price,
                    specs,
                    image,
                    category_level_2_id,
                    category_level_1_name,
                  }: Car) => (
                    <FinalCard
                      data={{
                        company_brand_name: brand_name,
                        image,
                        category_level_1_name: category_level_1_name,
                        category_level_2_name,
                        category_level_1_id,
                        category_level_2_id,
                        price,
                        specs,
                      }}
                      isCompare={false}
                      selected={false}
                      setShowModalCompare={setShowModalCompare}
                    />
                  )
                )}
              </div>
            ) : (
              <div className='grid max-[480px]:grid-cols-2 max-[769px]:grid-cols-2 min-[769px]:grid-cols-3 max-[480px]:gap-[25px] min-[481px]:gap-[40px] max-[480px]:px-[20px] min-[481px]:px-[50px] py-[20px]'>
                {cars.map(
                  ({
                    brand_name,
                    category,
                    category_level_2_name,
                    category_level_1_id,
                    price,
                    image,
                    category_level_2_id,
                    category_level_1_name,
                  }: Car) => (
                    <Card
                      key={category_level_2_id}
                      brand_name={brand_name}
                      category={category}
                      category_level_2_name={category_level_2_name}
                      category_level_1_id={category_level_1_id}
                      price={price}
                      specs={[]}
                      image={image}
                      category_level_1_name={category_level_1_name}
                      category_level_2_id={category_level_2_id}
                    />
                  )
                )}
              </div>
            )
          ) : (
            <div className='lc_empty_ctr'>
              <div className='lc_empty_title'>
                I'm sorry you can't find the car of your choice yet.
                <br />
                <span>Maybe you would like to try again ? </span>
                <br />
              </div>
              <div
                className='lc_empty_reset'
                onClick={() => {
                  window.scrollTo({
                    behavior: 'smooth',
                    top: 0,
                  });
                  handleReset();
                }}
              >
                Reset
              </div>
            </div>
          )
        ) : (
          <>
            {selectedCar ? (
              <div className='grid max-[480px]:grid-cols-2 max-[769px]:grid-cols-2 min-[769px]:grid-cols-3 max-[480px]:gap-[25px] min-[481px]:gap-[20px] min-[769px]:gap-[10px] max-[480px]:px-[20px] min-[481px]:px-[50px] py-[20px]'>
                <div className='py-[30px] lc_fc_info_ctr'>
                  <div className='lc_fc_ctr spec'>
                    <div className='lc_fc_body pt-[138px]'>
                      <div className='lc_fc_title'>CAR TYPE</div>
                      <div className='lc_fc_list_ctr mt-[85px]'>
                        {/* {selectedCar.recommendation.specs.map((item) => (
                          <div className='fc_list_item'>{item.spec_name}</div>
                        ))} */}
                        <div className='fc_list_item'>
                          <span>Body Type</span>
                        </div>
                        <div className='fc_list_item'>Passenger</div>
                        <div className='fc_list_item'>Suited Area</div>
                        <div className='fc_list_item'>Driven By</div>
                        <div className='fc_list_item'>Road Type</div>
                        <div className='fc_list_item'>Primary Use</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='py-[30px] max-[768px]:w-[calc(50%-15px)] flex justify-center'>
                  <FinalCard
                    data={selectedCar.recommendation}
                    selected={true}
                    isCompare={true}
                    setShowModalCompare={setShowModalCompare}
                  />
                </div>
                <div
                  className={`flex  max-[768px]:overflow-y-visible min-[769px]:overflow-x-scroll max-[768px]:flex-wrap min-[769px]:flex-nowrap gap-[40px] py-[30px]  ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  }`}
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {selectedCar.competitor.map(
                    (selectedCar: SelectedCarItem) => (
                      <FinalCard
                        data={selectedCar}
                        selected={false}
                        isCompare={true}
                        setShowModalCompare={setShowModalCompare}
                      />
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className='lc_empty_ctr'>
                <div className='lc_empty_title'>
                  Finish the question first <br />
                  <span>then select your car for comparison</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
