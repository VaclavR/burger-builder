import * as actionTypes from './actionsTypes'

export const addIngredient = ingredient => ({type: actionTypes.ADD_INGREDIENT, ingredient})
export const removeIngredient = ingredient => ({type: actionTypes.REMOVE_INGREDIENT, ingredient})

export const setIngredients = ingredients => ({type: actionTypes.SET_INGREDIENTS, ingredients})
export const fetchIngredientsFailed = () => ({type: actionTypes.FETCH_INGREDIENTS_FAILED})

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS
    }
}
