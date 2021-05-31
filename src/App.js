import React, { useEffect, useState, useMemo } from 'react';
import Trivia from './components/Trivia'
import Timer from './components/Timer'
import Start from './components/Start'
import { questionData } from './Questions'
import useSound from 'use-sound';
import count from './sounds/countDown2.mp3'
import wrong from './sounds/wrong.mp3'
import './app.css'

function App() {
  const [ questionNumber, setQuestionNumber] = useState(1);
  const [ username, setUsername] = useState(null);
  const [ stop, setStop] = useState(false);
  const [ earned, setEarned] = useState("₹ 0");
  const [timer, setTimer] = useState(30)
  const [holdtime, setHoldtime] = useState(null);
  const [hold, setHold] = useState(false);

  
  // const [countDownMusiq] = useSound(count);
  // const [wrongAnswer] = useSound(wrong);

  const moneyPyramid = useMemo(() => 
     [
      { id:1, amount:"1000"},
      { id:2, amount:"2000"},
      { id:3, amount:"3000"},
      { id:4, amount:"5000"},
      { id:5, amount:"10000"},
      { id:6, amount:"20000"},
      { id:7, amount:"40000"},
      { id:8, amount:"80000"},
      { id:9, amount:"160000"},
      { id:10, amount:"320000"},
      { id:11, amount:"640000"},
      { id:12, amount:"1250000"},
      { id:13, amount:"2500000"},
      { id:14, amount:"5000000"},
      { id:15, amount:"10000000"}
    ].reverse(), []) 

  useEffect(()=>{
    questionNumber > 1 &&
    setEarned(moneyPyramid.find((m) => m.id === questionNumber-1).amount)
  },[moneyPyramid, questionNumber])

  // useEffect(() => {
  //   if(timer <= 10 && timer > 0) {
  //      countDownMusiq()
  //   }
  // }, [timer])


  const  backToStart = () =>{
    window.location.reload()
  }

  if(questionNumber > 15){
    return (
      <div className="app lastQuestion">
        <h1>💐Congratulations you have won a ONE crore rupees 😍</h1>
        <h2>₹ 10000000</h2>
        <button onClick={()=>backToStart()} className="backToStartButton" style={{width:'400px'}}>Start with new competitor</button>
      </div>
    )
  }





  return (
    <div className="app">
       {
          username ?
          (
          <>
          <div className="main">
            {
              stop ? ( 
                <>
                <div className="entText">
                <h1>Thanks {username.charAt(0).toUpperCase() + username.slice(1)}</h1>
                <h2>You earned: {earned}</h2>
                <button onClick={()=>backToStart()} className="backToStartButton">Back to start</button>
                </div>
               </>
               ) :
              (
              <>
             <div className="top">
               {
                 hold ? 
                 <div className={timer <=10 ? "alertTimerHold" : "timer"}>
                 {
                  hold ? holdtime : <Timer questionNumber={questionNumber} setStop={setStop} timer={timer} setTimer={setTimer}  /> 
                 }
                 </div> 
                 
                 :

                <div className={timer <= 10 ? "alertTimer" : "timer"}>
                {
                hold ? holdtime : <Timer questionNumber={questionNumber} setStop={setStop} timer={timer} setTimer={setTimer} /> 
                }
                </div>
              }
            </div>
            <div className="bottom">
                <Trivia 
                  setHold={setHold}
                  setHoldtime={setHoldtime}
                  timer={timer}
                  setTimer={setTimer}
                  questionData={questionData}  
                  setStop={setStop}
                  questionNumber={questionNumber} 
                  setQuestionNumber={setQuestionNumber} 
                />
            </div>
           </>
              )
            }
          </div>
          <div className="pyramid">
             <ul className="moneyList">
               {
                //  stop ?  <h1>Game Over</h1> :
        
                 moneyPyramid.map(money => (
                  <li className={questionNumber === money.id  ? "moneyListItem active" : "moneyListItem"}>
                    <span className="moneyListItemNumber">{money.id}</span>
                    <span className="moneyListItemAmount">₹ {money.amount}</span>
                </li>
                 ))
              }
             </ul>
          </div>
          </>
          )
          :
          <Start setUsername={setUsername} />
        }
    </div>
  );
}

export default App;
