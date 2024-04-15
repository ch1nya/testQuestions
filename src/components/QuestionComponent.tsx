import React from 'react';
import {secondsToMinutes} from "../utils/utilities";

const QuestionCard = {
    margin: 0,
    padding: 1,
    width: "95%",
    minHeight: "60vh",
    height: "fitContent",
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',
    alignItems: "center",
    fontSize:14
}
interface Props {
    id: number,
    question: string,
    options?: string[],
    questionType: string,
    answer: string | string[] | undefined,
    onAnswerChange: (answer: string | string[]) => void,
    timeLimit: number
}
const inputStyles = {
    padding: "0.5rem",
    margin: "0.5rem 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    flexDirection: 'row' as const,
    display: "inline-block",
    width: "20rem",
};
const radioInputStyles = {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    flexDirection: 'column' as const,
};
const checkboxInputStyles = {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    flexDirection: 'column' as const,
};
const textAreaStyles = {
    ...inputStyles,
    height: "100px",
};

const QuestionComponent: React.FC<Props> = ({ id, question, options, questionType, answer, onAnswerChange, timeLimit }) => {
    return (
        <div style={QuestionCard}>
            <h5>Вопрос №{id+1}</h5>
            <h4>На выполнение теста осталось
                {timeLimit > 60
                    ?<a style={{color:'#1596c0'}}> {secondsToMinutes(timeLimit)}</a>
                    :<a style={{color:'#1596c0'}}> {timeLimit}</a> } секунд
            </h4>
            <h2>{question}</h2>
            {questionType === 'singleChoice' && (
                <div style={radioInputStyles}>
                    {options &&
                        options.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={option}
                                    name={`answer`}
                                    value={option}
                                    onChange={() => onAnswerChange(option)}
                                />
                                <label htmlFor={option}>{option}</label>
                            </div>
                        ))}
                </div>
            )}

            {questionType === 'multiChoice' && (
                <div style={checkboxInputStyles}>
                    {options &&
                        options.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={option}
                                    name="answer"
                                    value={option}
                                    onChange={() => {
                                        if (Array.isArray(answer)) {
                                            const newAnswer = answer.includes(option)
                                                ? answer.filter(item => item !== option)
                                                : [...answer, option];
                                            onAnswerChange(newAnswer);
                                        } else {
                                            onAnswerChange([option]);
                                        }
                                    }}
                                />
                                <label htmlFor={option}>{option}</label>
                            </div>
                        ))}
                </div>
            )}
            {(questionType === 'shortAnswer' || questionType === 'longAnswer') && (
                <div>
                    {questionType === 'shortAnswer' ? (
                        <input
                            style={inputStyles}
                            type='text'
                            value={answer}
                            onChange={(e) => onAnswerChange(e.target.value)}
                        />
                    ) : (
                        <textarea
                            style={textAreaStyles}
                            value={answer}
                            onChange={(e) => onAnswerChange(e.target.value)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default QuestionComponent;
