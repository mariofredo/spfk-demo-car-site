'use client';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import {ArrowLeftRed} from '@/public/images';
import {useCar} from '@/context/carContext';
import {Question, AnsweredData} from '@/types/question';

export default function Header({
  step,
  setStep,
}: {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const {
    setCars,
    questions,
    setQuestions,
    answeredQuestion,
    setAnsweredQuestion,
    questionNum,
    setQuestionNum,
    firstFetch,
    setFirstFetch,
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

  // useEffect(() => {
  //   getQuestions();
  // }, []);

  useEffect(() => {
    getCarRecommendations(answeredQuestion.map((el) => el.id));
  }, [answeredQuestion]);

  const handleBack = useCallback(() => {
    if (answeredQuestion.length > 0) {
      const filteredData = answeredQuestion.filter(
        (key) => key.id !== questionNum
      );
      const lastIdx = answeredQuestion.length - 1;
      const num = answeredQuestion[lastIdx].id;
      setQuestionNum(num);
      setAnsweredQuestion(filteredData.slice(0, -1));
    }
  }, [questionNum, answeredQuestion]);

  const getCarRecommendations = async (arr: number[]) => {
    try {
      console.log(arr, 'arr');
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
      className={`grid grid-cols-2 pt-[106px] header_ctr ${
        step >= 1 ? 'active static' : 'absolute top-0'
      }`}
    >
      <div className='flex justify-between items-center px-[78px]'>
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
      <div className={`flex  ${'flex-row justify-evenly items-center'}`}>
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
                  setAnsweredQuestion((prev) => [
                    ...prev,
                    {id, next_question_id},
                  ]);
                  setQuestionNum(next_question_id);
                  if (firstFetch) setFirstFetch(false);
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
