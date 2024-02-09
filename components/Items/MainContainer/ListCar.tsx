'use client';
import {Card, FinalCard} from '@/components';
import {useCar} from '@/context/carContext';
import {Car, SelectedCar, SelectedCarItem} from '@/types/car';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

export default function ListCar({
  step,
  setStep,
}: {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const {cars, tab, setTab, selectedCar} = useCar();

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
  // useEffect(() => {
  //   console.log(cars, 'cars');
  // }, [cars]);
  return (
    <div className={`lc_ctr ${step >= 1 ? 'active' : 'inactive'}`}>
      <div className='lc_wrapper'>
        <div className='lc_filters'>
          <div className='lc_filters_txt'>
            {cars.length === 1 ? `${cars.length} Car` : `${cars.length} Cars`}{' '}
            Match
          </div>
          <div className='lc_filters_btn_ctr'>
            <button
              className={`lc_filters_btn ${tab === 1 ? 'active' : 'inactive'}`}
              onClick={() => setTab(1)}
              disabled={step < 1}
            >
              Car list
            </button>
            <button
              className={`lc_filters_btn ${tab === 2 ? 'active' : 'inactive'}`}
              onClick={() => setTab(2)}
              disabled={step < 1}
            >
              Compare cars
            </button>
          </div>
        </div>
        {tab === 1 ? (
          <div className='grid max-[480px]:grid-cols-1 max-[767px]:grid-cols-2  min-[768px]:grid-cols-4 gap-[70px] px-[50px]'>
            {cars.map(
              ({
                brand,
                category,
                name,
                category_level_1_id,
                category_level_2_id,
                price,
                spec,
                image,
              }: Car) => (
                <Card
                  key={category_level_2_id}
                  brand={brand}
                  category={category}
                  name={name}
                  category_level_1_id={category_level_1_id}
                  category_level_2_id={category_level_2_id}
                  price={price}
                  spec={spec}
                  image={image}
                />
              )
            )}
          </div>
        ) : (
          <>
            {selectedCar ? (
              <div className='flex gap-[40px]'>
                <div className='py-[30px]'>
                  <div className='lc_fc_ctr'>
                    <div className='lc_fc_body pt-[171px]'>
                      <div className='lc_fc_title'>CAR TYPE</div>
                      <div className='lc_fc_list_ctr mt-[85px]'>
                        {selectedCar.recommendation.specs.map((item) => (
                          <div className='fc_list_item'>{item.spec_name}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='py-[30px]'>
                  <FinalCard
                    data={selectedCar.recommendation}
                    selected={true}
                  />
                </div>
                <div
                  className={`flex w-[calc(100%-120px)] overflow-x-scroll flex-nowrap gap-[40px] py-[30px] ${
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
                      <FinalCard data={selectedCar} selected={false} />
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
}
