import { useState } from 'react'
import Header from './components/Header'
import Status from './components/Status'
import {languages} from "./languages"
import {getFarewellText, getRandomWord} from "./utils"

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState( () => getRandomWord() ) // Lazy state inicialization
  const [guessedLetters, setGuessLetters] = useState([])

  // Derived values
  const numGuessesLeft = languages.length - 1 ;
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = 
    currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = (
    guessedLetters.length === 0 ? "" : guessedLetters[guessedLetters.length - 1] 
  )
  const isLastGuessIncorrect = (
    guessedLetters.length === 0 ? false : !currentWord.includes(lastGuessedLetter) 
  )

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessLetter(letter) {
    if (!isGameOver)
    {
      setGuessLetters(prevLetters => 
        prevLetters.includes(letter) ? 
          prevLetters :
          [...prevLetters, letter]
      )
    }
  }

  function startNewGame () {
    setCurrentWord(getRandomWord())
    setGuessLetters([])
  }

  const languageElements = languages.map ((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return (
      <span 
        className={`chip ${isLanguageLost ? "lost" : ""}`} 
        style={styles}
        key={lang.name}
        >
          {lang.name}
        </span>
    )
  })

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = (isGameLost && !guessedLetters.includes(letter)) ? 
      "missed-letter" : ""
    return (
      <span key={index} className={letterClassName}>
        { shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    )
  })

  const keyboardElements = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    // NOTE: I didn't use clsx
    const styles = !isGuessed ? {backgroundColor: "#FCBA29"} : 
      isCorrect ? {backgroundColor: "#10A95B"} : {backgroundColor: "#EC5D49"} 
    return (
      <button 
        key={letter}
        style={styles}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
        return (
          <p className='farewell-message'>
            {getFarewellText(languages[wrongGuessCount -1].name)}
          </p>
        )
    }

    if (isGameWon) {
        return (
            <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </>
        )
    } 
    if (isGameLost) {
        return (
            <>
                <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </>
        )
    }
    return null
  }

  const gameStatusClass = `game-status ${isGameWon ? "won" : isGameLost ? "lost" : 
    (!isGameOver && isLastGuessIncorrect) ? "farewell" : ""}`
  console.log(gameStatusClass)

  return (
    <main>
      <Header />
      <section
        aria-live='polite' 
        role="status" 
        className={gameStatusClass}
      >
        {renderGameStatus()}
      </section>

      <section className='language-chips'>
        {languageElements}
      </section>
      <section className='word'>
        {letterElements}
      </section>

      {/* Combined visually-hidden aria-live region for status updates. */}
      <section className='sr-only' aria-live='polite' role='status'>
        <p>
          {currentWord.includes(lastGuessedLetter) ?
            `Correct! The letter ${lastGuessedLetter} is in the word.` :
            `Sorry, the letter ${lastGuessedLetter} is not in the word.`
          }
          You have {numGuessesLeft} attempts left.
        </p>
        <p>Current word: {currentWord.split("").map(letter => 
          guessedLetters.includes() ? letter + "." : "blank.").join(" ")}
          </p>
      </section>

      <section className='keyboard'>
        {keyboardElements}
      </section>
      {isGameOver &&
        <button onClick={startNewGame} className="new-game">New Game</button>}
    </main>
  )
}

export default App
