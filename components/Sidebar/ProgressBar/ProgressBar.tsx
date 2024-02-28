import {useEffect, useState} from 'react';

export const ProgressBar = ({limit}: {limit: {top: number; bot: number}}) => {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    // Update width when the limit prop changes
    setWidth((limit.bot / limit.top) * 100);
  }, [limit]);
  return (
    <>
      <div className='sb_pb_ctr'>
        <div className='sb_pb_fill' style={{width: `${width}%`}}></div>
      </div>
    </>
  );
};
