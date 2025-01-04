import { useState, useEffect, useRef } from 'react'
import Dice from './Dice'

function App() {

  const [dice, setDice] = useState(() => generateAllNewDice())
  
  // true if the game is in a win state
  const gameWon = dice.every(diceObj => diceObj.isHeld) && 
    dice.every(diceObj => diceObj.value === dice[0].value)

  // WARNING: Render two times each time we want to hold or roll a dice
  console.log(gameWon)
  
  const buttonRef = useRef(null)
  useEffect(() => { // accesibility improvement!
    if (gameWon) {
        buttonRef.current.focus()
    }
  }, [gameWon])

  // Generate new values to that non hold 
  function handleRoll() {
    if (!gameWon)
    {
      setDice (oldDice => oldDice.map(diceObj => 
        diceObj.isHeld ? diceObj :
          {...diceObj, value: Math.ceil(Math.random() * 6)}
        ))
    } else {
      setDice(generateAllNewDice())
    }
  }

  function hold(id) {
    // Trigger each time we press a button
    // should update the dice state value
    setDice( oldDice => oldDice.map( diceObj =>
      (diceObj.id === id) ? 
        {...diceObj, isHeld: !diceObj.isHeld} : 
        diceObj 
    ))
  }

  // trigger this function each time we start a new game!
  function generateAllNewDice() {
    return new Array(10) // Create a new array
        .fill(0) // Fill that array with 0s
        .map((elm, idx) => ({ // fill with random values
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: idx // instead of using the nanoid we can use the element index
        }))
  }

  const diceElements = dice.map( (diceObj) => (
      <Dice 
        key={diceObj.id} 
        value={diceObj.value}
        isHeld={diceObj.isHeld}
        hold={() => hold(diceObj.id)}
      />
    ))

  return (
    <main>
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>
      Roll until all dice are the same. Click each die to freeze it at its current value between rolls. 
      </p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button ref={buttonRef} className='roll-dice' onClick={handleRoll}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
