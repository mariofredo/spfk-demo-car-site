import {useCar} from '@/context';
import {AnsweredData, Question} from '@/types';
import {useCallback, useEffect, useState} from 'react';

export const AnswerCard = ({data, idx}: {data: AnsweredData; idx: number}) => {
  const {answeredQuestion, setAnsweredQuestion, setTab, setFinish} = useCar();
  const [selected, setSelected] = useState({
    answer_id: data.answer_id,
    tag: data.tag,
  });
  const [expand, setExpand] = useState<boolean>(false);
  const [appear, setAppear] = useState<boolean>(false);
  useEffect(() => {
    setAppear(true);
  }, []);
  const handleChange = useCallback(
    (idx: number) => {
      setAnsweredQuestion((prev: AnsweredData[]) => {
        const newQuestion = [...prev];
        const newAnswer = newQuestion.slice(0, idx + 1);
        return newAnswer;
      });
    },
    [selected, answeredQuestion]
  );
  return (
    <div
      className={`sb_ac_ctr ${appear ? 'appear' : ''} ${
        expand ? 'expand' : 'not_expand'
      }`}
      // onMouseEnter={() => !expand && setExpand(true)}
      // onMouseLeave={() => expand && setExpand(false)}
      onClick={() => setExpand(!expand)}
    >
      <div className='left'>Q{idx + 1}</div>
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
                    name={'ans_' + idx + 1}
                    id={`${key.tag_id}`}
                    checked={selected.answer_id === key.answer_id}
                    value={key.answer_id}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSelected({
                        answer_id: parseInt(e.target.value),
                        tag: key.tag,
                      });
                      handleChange(idx);
                      setFinish(false);
                      setTab(1);
                    }}
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
