
import { useState } from 'react'
import Gamespace from './components/Gamespace';
import './App.css'

function App() {

  const [level, setLevel] = useState("easy");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const changeLevel = (event)=> {
    setLevel(event.target.value);
  }

  return (
    <>
      <section className='header'>
        <h1><span className='color-red'>Poke</span><span>Game</span></h1>
        <div className='level'>
          <select id="level" name="level" value={level} onChange={(event)=> changeLevel(event)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </section>

      <section className='score-card'>
        <div><span className='color-red'>Score:</span>  {score}</div>
        <div><span className='color-red'>Best Score:</span> {bestScore} </div>
      </section>

      <Gamespace/>
    </>
  )
}

export default App
