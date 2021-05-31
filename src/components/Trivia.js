import React,{useState, useEffect} from 'react';
import useSound from 'use-sound';
import play from '../sounds/play.mp3'
import correct from '../sounds/correct.mp3'
import wrong from '../sounds/wrong.mp3'

function Trivia({ questionData, setStop, questionNumber, setQuestionNumber, setHoldtime, setHold, setTimer, timer }) {

    const [questions, setQuestions] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState('answer');

    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);
    
    useEffect(() => {
      letsPlay()
    },[letsPlay])

    useEffect(() => {
     setQuestions(questionData[questionNumber -1])
    },[questionData, questionNumber])
    

    const delay = (duration, callback) => {
        setTimeout(()=>{
            callback();
        },duration)
    }

   

    const  handleClick = (answer) => {
        setHoldtime(timer)
        setHold(true)
        setSelectedAnswer(answer)
        setClassName("answer active")
        delay( 3000, () => setClassName(answer.correct ? "answer correct" : "answer wrong")  )
        delay( 5000 , ()=> {
            if(answer.correct){
                correctAnswer();
                delay(3000 , ()=>{
                    setQuestionNumber(prev  => prev + 1);  
                    setSelectedAnswer(null) 
                    setHoldtime(null)
                    setHold(false)
                })
            } else {
                wrongAnswer();
                delay(1000 , ()=>{
                setStop(true)
                })
            }
        })
    }

    return (
        <div className="trivia">
            <div className="question">{questions?.question}</div>
            <div className="answers">
                { questions?.answers.map((answer,index) => (
                    <div className={ selectedAnswer === answer ? className : "answer" }  key={index} onClick={()=>handleClick(answer)}>{answer.text}</div>
                ))
                }
            </div>
        </div>
    )
}

export default Trivia
