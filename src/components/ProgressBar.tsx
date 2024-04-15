import {useState} from "react";

export function ProgressBar({totalNumberOfQuestions,currentQuestionNumber}:{totalNumberOfQuestions: number, currentQuestionNumber: number}) {
    const containerStyle= {
        width: "16rem",
        margin: '0 auto',
        height: "3rem"

    }
    const progressBarStyles = {
        width: "100%",
        height:'.5rem',
        borderRadius: 10,
        backgroundColor:'white'
    }
    const progressBarFillStyles = {
        height: "100%",
        borderRadius: 10,
        backgroundColor: "#1596c0",
        transaction: 'width 0.5 ease-out',
    }
    const progressBarLabelStyles = {
        paddingTop:'10px',
        fontSize: '.7rem'
    }
    return (
        <div className='container' style={containerStyle}>
            <div className='progressBar'  style={progressBarStyles}>
                <div className='progressBarFill'
                     style={{...progressBarFillStyles,width: `${currentQuestionNumber/totalNumberOfQuestions*100}%`}}></div>
            </div>
            <div className='progressBarLabel' style={progressBarLabelStyles}>{currentQuestionNumber/totalNumberOfQuestions*100}%</div>
        </div>
    );
}