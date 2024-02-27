export const ProgressBar = ({limit}: {limit: {top: number; bot: number}}) => {
  return (
    <>
      <div className='sb_pb_ctr'>
        <div
          className='sb_pb_fill'
          style={{width: `${(limit.bot / limit.top) * 100}%`}}
        ></div>
      </div>
    </>
  );
};
