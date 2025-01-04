import React, { useEffect } from 'react';
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from './ClaudeRecipe';

/**
 * NOTE: The IA part of this project was not implemented!
 */

export default function Main () {
    // initial state is an empty array
    const [ingredients, setIngredients] = React.useState(["Chicken", "Oregano", "Tomatoes"])
    const [recipeShown, setRecipeShown] = React.useState(false)
    // This state variable is not used because the IA part of this project is not implemented.
    const [recipe, setRecipe] = React.useState("")

    const recipeSection = React.useRef(null)

    useEffect(() => {
        if(recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behaviour: "smooth"})
        }

    }, [recipe])

    function addIngredient (event) {
        // need this line so it does not reset!
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")

        setIngredients( prevIngredients => [...prevIngredients, newIngredient])
    }

    /*
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    and form action does not work in my version of React, that is 18.3.1
    apparently it only works in the canary version
    */

    function toggleRecipeShown () {
        setRecipeShown(prevShown => !prevShown)
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient" 
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    /** function as a parameter so the component can call it */
                    toggleRecipeShown = {toggleRecipeShown}
                />
            }
            {/* Hardcoded recipe! */}
            { recipeShown &&
                <ClaudeRecipe />
            }
        </main>
    )
}