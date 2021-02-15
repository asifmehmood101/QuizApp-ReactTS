import React from 'react';
import { fetchQuizQuestions, QuestionState } from './Api';

//commponents
import QuestionCard from './components/QuestionCard';

//styles
import { GloblStyle, Wraper } from './App.style';

//Diffculties
import { Difficulty } from './Api';

//tota_Question
const TOTAL_QUESTIONS = 10;

//answer object
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  // all Quiz App State
  const [loading, setLoading] = React.useState(false);
  const [questions, setQestion] = React.useState<QuestionState[]>([]);
  const [number, setNumber] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([]);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    );

    setQestion(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnwer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer
      const answer = e.currentTarget.value;
      //check answer against correct answer
      const correct = questions[number].correct_answer === answer;

      //add score  if answer is correct
      if (correct) setScore((prev) => prev + 1);

      //save answer in array userAnswer
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, AnswerObject]);
    }
  };

  const nextQuestion = () => {
    //if its not a last question
    const NextQuestion = number + 1;
    if (NextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(NextQuestion);
    }
  };

  return (
    <>
      <GloblStyle />
      <Wraper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : (
          ''
        )}

        {!gameOver ? <p className='score'>score:{score}</p> : null}
        {loading && <p>Loading Question...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnwer}
          />
        )}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wraper>
    </>
  );
}

export default App;
