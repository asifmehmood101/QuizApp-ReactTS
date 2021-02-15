import React from 'react';

import { AnswerObject } from '../App';

///styles
import { Wraper, ButtonWraper } from '../QuestionCard.styled';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  answers,
  callback,
  question,
  questionNr,
  totalQuestions,
  userAnswer,
}) => {
  return (
    <Wraper>
      <p className='number'>
        Question :{questionNr}/{totalQuestions}
      </p>
      {/*In simple words, using dangerouslySetInnerHTML , you can set HTML directly from React */}
      <p dangerouslySetInnerHTML={{ __html: question }} />
      {answers.map((answer) => {
        return (
          <ButtonWraper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userclikced={userAnswer?.answer === answer}
          >
            <button
              disabled={userAnswer ? true : false}  
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWraper>
        );
      })}
    </Wraper>
  );
};

export default QuestionCard;
