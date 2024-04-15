import {useEffect} from "react";
import {Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;

export function AfterSubmit() {
    const containerStyles = {
        backgroundColor: '#282c34',
        height: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: "column" as const,
        justifyContent: 'center',
        alignItems: 'center',
    };

    useEffect(()=>{
        const resultToPrint = localStorage.getItem('testProgress')
        console.log(resultToPrint)
        localStorage.clear()
    },[])
    return (
        <div style={containerStyles}>
            <h1>Test is submitted successfully✌️</h1>
            <p>Look at your console️</p>
        </div>
    );
}
