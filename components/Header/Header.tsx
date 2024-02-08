'use client';
import Image from 'next/image';
import {Dispatch, SetStateAction, useCallback, useEffect} from 'react';
import {ArrowLeftRed} from '@/public/images';
import {useCar} from '@/context/carContext';

export default function Header({
  step,
  setStep,
}: {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const {
    cars,
    setCars,
    questions,
    setQuestions,
    answeredQuestion,
    setAnsweredQuestion,
    questionNum,
    setQuestionNum,
    firstFetch,
    setFirstFetch,
    finish,
    setFinish,
    setSelectedCar,
    setTab,
  } = useCar();
  const handleFormatQuestion = (question: string, isMarkedRed: boolean) => {
    if (question) {
      if (isMarkedRed) return question.split(' ').slice(-3).join(' ');
      else {
        const arrSplit = question.split(' ');
        return arrSplit.slice(0, arrSplit.length - 3).join(' ');
      }
    }
  };

  useEffect(() => {
    getCarRecommendations(answeredQuestion.map((el) => el.id));
  }, [answeredQuestion]);

  useEffect(() => {
    if (cars.length === 0) setSelectedCar(null);
  }, [cars]);

  const handleBack = useCallback(() => {
    if (answeredQuestion.length === 1) setFirstFetch(true);
    if (answeredQuestion.length > 1) {
      let updatedData = answeredQuestion;
      updatedData.splice(-1, 1);
      const lastIdx = updatedData.length - 1;
      const num = updatedData[lastIdx].current_question_id;
      setQuestionNum(num);
      setAnsweredQuestion((prev) => {
        let data = [...prev];
        data.splice(-1, 1);
        return data;
      });
      setFinish(false);
      setTab(1);
    }
  }, [questionNum, answeredQuestion]);

  const getCarRecommendations = async (arr: number[]) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get-recommendation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({tags: arr}),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCars(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`grid md:grid-rows-2 md:grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 pt-[106px] header_ctr ${
        step >= 1 ? 'active static' : 'absolute top-0'
      }`}
    >
      <div className='flex justify-between items-center px-[39px] '>
        <Image
          src={ArrowLeftRed}
          alt='ArrowLeftRed'
          className='h-[20px] w-[10px] cursor-pointer'
          onClick={handleBack}
        />
        <p className='text-[32px] text-right'>
          {handleFormatQuestion(
            questions[
              firstFetch === true
                ? 0
                : questions.findIndex((el) => el.id == questionNum)
            ]?.content,
            false
          )}{' '}
          <span className='header_redline'>
            {handleFormatQuestion(
              questions[
                firstFetch === true
                  ? 0
                  : questions.findIndex((el) => el.id == questionNum)
              ]?.content,
              true
            )}
          </span>
        </p>
      </div>
      <div
        className={`flex flex-wrap ${'flex-row justify-evenly items-center'}`}
      >
        {questions[
          firstFetch === true
            ? 0
            : questions.findIndex((el) => el.id == questionNum)
        ]?.result_answers.map(({tag, id, next_question_id}) => (
          <div className='header_option' key={id}>
            <input
              id={tag}
              type='radio'
              name='option'
              value={tag}
              onClick={() => {
                if (next_question_id !== 0) {
                  if (firstFetch) {
                    setFirstFetch(false);
                    setAnsweredQuestion((prev) => [
                      ...prev,
                      {
                        id,
                        next_question_id,
                        current_question_id: questions[0].id,
                      },
                    ]);
                    setQuestionNum(next_question_id);
                  } else {
                    setAnsweredQuestion((prev) => [
                      ...prev,
                      {id, next_question_id, current_question_id: questionNum},
                    ]);
                    setQuestionNum(next_question_id);
                  }
                } else {
                  if (finish) {
                    setAnsweredQuestion((prev) => {
                      const data = [...prev];
                      data[data.length - 1] = {
                        id,
                        next_question_id,
                        current_question_id: questionNum,
                      };
                      return data;
                    });
                  } else {
                    setFinish(true);
                    setAnsweredQuestion((prev) => [
                      ...prev,
                      {id, next_question_id, current_question_id: questionNum},
                    ]);
                  }
                }
              }}
            />
            <label htmlFor={tag} className='option_label'>
              {tag}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
