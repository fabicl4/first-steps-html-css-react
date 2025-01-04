import React from "react"
import { useEffect } from "react"

export default function App(props) {
    const [starWarsData, setStarWarsData] = React.useState(null)
    
    console.log("Rendered!")

    useEffect( () => {
      console.log("fetch starwars data")
      fetch("https://swapi.dev/api/people/1")
        .then(res => res.json())
        .then(data => setStarWarsData(data))
    }, [])
    
    // side effects - useEffect
    
    return (
        <div>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
        </div>
    )
}