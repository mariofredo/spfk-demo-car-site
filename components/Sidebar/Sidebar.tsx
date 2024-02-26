import {ChangeEvent, useCallback, useEffect} from 'react';
import Image from 'next/image';
import {ProgressBar, AnswerCard} from '@/components';
import {ReturnBtn} from '@/public/images';
import {useCar} from '@/context';
import {AnsweredData, ApiResponseQuestion, Question} from '@/types';
import './Sidebar.css';

export const Sidebar = () => {
  const {
    setCars,
    companyBrand,
    questionBatch,
    answeredQuestion,
    setAnsweredQuestion,
    question,
    setQuestion,
    uniqueId,
    setUniqueId,
    finish,
    setFinish,
  } = useCar();

  const getCarRecommendations = async (arr: number[]) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recommendations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_brand: companyBrand,
            question_batch: questionBatch,
            u_id: uniqueId,
            answer: arr,
          }),
        }
      );
      if (response.ok) {
        const res = await response.json();
        const data: ApiResponseQuestion = res.data;
        if (data.u_id) setUniqueId(data.u_id);
        if (!data.question) {
          console.log('finish');
          setFinish(true);
        } else {
          setQuestion({
            data: {
              content: data.question.content,
              id: data.question.id,
            },
            choices: data.choices,
          });
        }
        setCars(data.recommendations);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCarRecommendations(answeredQuestion.map((data) => data.answer_id));
  }, [answeredQuestion]);

  const handleAnswer = useCallback(
    (answer_id: number, tag: string) => {
      setAnsweredQuestion((prev) => [
        ...prev,
        {
          id: question.data.id,
          content: question.data.content,
          choices: question.choices,
          answer_id,
          tag,
        },
      ]);
    },
    [question.choices]
  );
  return (
    <div className='sb_ctr'>
      <ProgressBar />
      <Image src={ReturnBtn} alt='return_button' className='sb_return_btn' />
      <p className='sb_title'>Preferences</p>
      {answeredQuestion.length > 0 && (
        <div className='sb_answer_list'>
          {answeredQuestion.map((data: AnsweredData, idx: number) => (
            <AnswerCard key={data.id} data={data} idx={idx + 1} />
          ))}
        </div>
      )}
      {finish ? (
        <div className='sb_f_ctr'>
          <p className='sb_f_big'>Congratulation!</p>
          <p className='sb_f_small'>Here's your recommended car:</p>
        </div>
      ) : (
        <div className='sb_q_ctr'>
          <div className='relative'>
            <p className='sb_q_txt'>{question.data.content}</p>
            <span className='sb_q_num'>Q{answeredQuestion.length + 1}</span>
          </div>
          <div className='sb_btn_ctr'>
            {question.choices.map((key) => (
              <div key={key.tag_id} className='relative'>
                <input
                  type='radio'
                  name='option'
                  id='radio_btn_1'
                  value={key.answer_id}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleAnswer(parseInt(e.target.value), key.tag)
                  }
                />
                <label htmlFor='radio_btn_1' className='sb_btn_txt'>
                  {key.tag}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
