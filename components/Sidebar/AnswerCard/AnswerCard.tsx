import {AnsweredData, Question} from '@/types';
import {useState} from 'react';

export const AnswerCard = ({data, idx}: {data: AnsweredData; idx: number}) => {
  const [selected, setSelected] = useState({
    answer_id: data.answer_id,
    tag: data.tag,
  });
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <div className='sb_ac_ctr' onClick={() => setExpand(!expand)}>
      <div className='left'>Q{idx}</div>
      <div className='right'>
        {!expand && <div className='selected_option'>{selected.tag}</div>}
        {expand && (
          <>
            <div className='sb_ac_q'>{data.content}</div>
            <div className='list_option'>
              {data.choices.map((key) => (
                <div key={key.tag_id} className='relative'>
                  <input
                    type='radio'
                    name='ans'
                    id={`${key.tag_id}`}
                    checked={selected.answer_id === key.answer_id}
                    value={key.answer_id}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSelected({
                        answer_id: parseInt(e.target.value),
                        tag: key.tag,
                      })
                    }
                  />
                  <label htmlFor='ans_1'>{key.tag}</label>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
