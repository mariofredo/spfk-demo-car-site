'use client';
import Card from '@/components/Cards/Card';
import FinalCard from '@/components/Cards/FinalCard';
import React, {useRef, useState} from 'react';

export default function ListCar() {
  const arr = [1, 2, 3, 4];
  const [tab, setTab] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  return (
    <div className='lc_ctr px-[50px] py-[30px]'>
      <div className='lc_filters'>
        <div>1,728 Cars Match</div>
        <div className='lc_filters_btn_ctr'>
          <button
            className={`lc_filters_btn ${tab === 1 ? 'active' : 'inactive'}`}
            onClick={() => setTab(1)}
          >
            Car list
          </button>
          <button
            className={`lc_filters_btn ${tab === 2 ? 'active' : 'inactive'}`}
            onClick={() => setTab(2)}
          >
            Compare cars
          </button>
        </div>
      </div>
      {tab === 1 ? (
        <div className='grid grid-cols-4 gap-[70px]'>
          {arr.map((_) => (
            <Card />
          ))}
        </div>
      ) : (
        <>
          <div className='flex gap-[40px]'>
            <div className='py-[30px]'>
              <div className='lc_fc_ctr'>
                <div className='lc_fc_body pt-[150px]'>
                  <div className='lc_fc_title'>CAR TYPE</div>
                  <div className='lc_fc_list_ctr mt-[85px]'>
                    <div className='fc_list_item'>Truck</div>
                    <div className='fc_list_item'>4 people</div>
                    <div className='fc_list_item'>North</div>
                    <div className='fc_list_item'>Chaffeured</div>
                    <div className='fc_list_item'>City Driving</div>
                    <div className='fc_list_item'>Daily Commute</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='py-[30px]'>
              <FinalCard selected={true} />
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
              {arr.map((_) => (
                <FinalCard selected={false} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
