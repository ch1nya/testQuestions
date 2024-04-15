import React, {useEffect, useState} from 'react';
import QuestionComponent from './QuestionComponent';
import {questionsData} from '../questionsData'
import { useNavigate } from 'react-router-dom';
import {ProgressBar} from "./ProgressBar";

const buttonSectionStyles = {
    display:'flex',
    justifyContent:'space-evenly',
    alignItems: 'center',
    width:'50%'
}
type Progress = {
    currentQuestion: number;
    answers: Record<number, string | string[]>;
};

const TestComponent: React.FC = () => {
    const initialProgress: Progress = JSON.parse(localStorage.getItem('testProgress') || 'null') || {
        currentQuestion: 0,
        answers: {},
    };
    const [progress, setProgress] = useState<Progress>(initialProgress);
    const [timeLimit, setTimeLimit] = useState(360);
    const navigate = useNavigate();
    const handleAnswer = (answer: string | string[]) => {
        setProgress((prevProgress) => ({
            ...prevProgress,
            answers: {
                ...prevProgress.answers,
                [prevProgress.currentQuestion]: answer,
            },
            currentQuestion: prevProgress.currentQuestion,
        }));
    };

    const nextQuestion = () => {
        setProgress((prevProgress) => ({
            ...prevProgress,
            currentQuestion: prevProgress.currentQuestion + 1,
        }));
    };

    const prevQuestion = () => {
        setProgress((prevProgress) => ({
            ...prevProgress,
            currentQuestion: prevProgress.currentQuestion - 1,
        }));
    };

    const onSubmit = () => {
        navigate('/status');
    };

    useEffect(() => {
        localStorage.setItem('testProgress', JSON.stringify(progress));
    }, [progress]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLimit((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);
        if(timeLimit === 0){
            navigate('/status')
            return () => clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [timeLimit]);

    const currentQuestionData = questionsData[progress.currentQuestion];
    const totalNumberOfQuestions = questionsData.length;

    return (
        <div className='App'>
            <ProgressBar
                totalNumberOfQuestions={totalNumberOfQuestions}
                currentQuestionNumber={progress.currentQuestion} />
            <QuestionComponent
                timeLimit = {timeLimit}
                id={progress.currentQuestion}
                question={currentQuestionData.question}
                options={currentQuestionData.options}
                questionType={currentQuestionData.questionType}
                answer={currentQuestionData.correctAnswer}
                onAnswerChange={handleAnswer}
            />
            <div className='buttonSection'
                 style={buttonSectionStyles}>
                <button onClick={prevQuestion}
                        disabled={progress.currentQuestion === 0}>
                    Previous
                </button>

                {progress.currentQuestion !== totalNumberOfQuestions - 1 ? (
                    <button onClick={nextQuestion}>Next</button>
                ) : (
                    <button onClick={onSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
};
export default TestComponent;