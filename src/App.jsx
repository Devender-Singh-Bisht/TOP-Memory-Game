import { useState } from 'react'

import './App.css'

function App() {

  const [level, setLevel] = useState("easy");

  const changeLevel = (event)=> {
    setLevel(event.target.value);
  }

  return (
    <>
      <section className='header'>
        <h1><span>Poke</span><span>Game</span></h1>
        <div className='level'>
          <select id="level" name="level" value={level} onChange={(event)=> changeLevel(event)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </section>
    </>
  )
}

export default App
