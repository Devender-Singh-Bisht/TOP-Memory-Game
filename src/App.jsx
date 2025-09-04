
import { useState } from 'react'
import Gamespace from './components/Gamespace';
import './App.css'

function App() {

  const [level, setLevel] = useState(8);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const changeLevel = (event)=> {
    setLevel(Number(event.target.value));
  }

  return (
    <>
      <section className='header'>
        <h1><span className='color-red'>Poke</span><span>Game</span></h1>
        <div className='level'>
          <select id="level" name="level" value={level} onChange={(event)=> changeLevel(event)}>
            <option value={8}>Easy</option>
            <option value={12}>Medium</option>
            <option value={16}>Hard</option>
          </select>
        </div>
      </section>

      <div className='rules'>Get points by clicking on an image but don't click on any more than once!</div>

      <section className='score-card'>
        <div><span className='color-red'>Score:</span>  {score}</div>
        <div><span className='color-red'>Best Score:</span> {bestScore} </div>
      </section>

      <Gamespace level={level} score={score} bestScore={bestScore} setScore={setScore} setBestScore={setBestScore}/>
    </>
  )
}

export default App
