import React from "react"

export default function Joke (props) {
    const [isShown, setIsShown] = React.useState(false)

    function toggleShown()
    {
        setIsShown(
            prevShown => !prevShown
        )
    }

    return (
        <>
            {
                props.setup && <p className="setup">Setup: {props.setup}</p>
            }
            {
                isShown ?
                <p className="punchline">Punchline: {props.punchline}</p> : null
            }
            <button onClick={toggleShown}>{isShown ? "Show" : "Hide"} punchline</button>
            <hr/>
        </>
    )
}