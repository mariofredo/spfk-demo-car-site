import {Dispatch, SetStateAction} from 'react';
import Image from 'next/image';
import {useCar, useScreen} from '@/context';
import {AddCircle, CloseIcon, DownloadCircle} from '@/public/images';
import {CompareDesktop, CompareMobile} from './Items';

import '../Modal.css';
export const ModalCompare = ({
  setShowModalCompare,
  setShowModalText,
  handleReset,
}: {
  setShowModalText: Dispatch<SetStateAction<boolean>>;
  setShowModalCompare: Dispatch<SetStateAction<boolean>>;
  handleReset: () => void;
}) => {
  const {answeredQuestion, setTab, selectedCar} = useCar();
  const {width} = useScreen();
  return (
    <div className='mdl_bd'>
      <div className='mdl_compare_ctr'>
        {width < 768 ? (
          <CompareMobile
            answeredQuestion={answeredQuestion}
            recommendation={selectedCar.recommendation}
            competitor={selectedCar.competitor}
            setShowModalCompare={setShowModalCompare}
            setShowModalText={setShowModalText}
            handleReset={handleReset}
          />
        ) : (
          <CompareDesktop
            recommendation={selectedCar.recommendation}
            competitor={selectedCar.competitor}
            setShowModalCompare={setShowModalCompare}
            setShowModalText={setShowModalText}
          />
        )}
      </div>
    </div>
  );
};
