import * as actionTypes from '../actions/actionsTypes'
import {updateObject} from '../utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    isError: false
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addOrRemoveIngredient = (state, action, value) => {
    const updatedIngredient = {[action.ingredient]: state.ingredients[action.ingredient] + value}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
    }
    return updateObject(state, updatedState)
}

const setIngredients = (state, action) => {
    const updatedIngredients = {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
    }
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: 4,
        isError: false
    }
    return updateObject(state, updatedState)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addOrRemoveIngredient(state, action, 1)
        case actionTypes.REMOVE_INGREDIENT: return addOrRemoveIngredient(state, action, -1)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {isError: true})
        default: return state
    }
}

export default reducer
