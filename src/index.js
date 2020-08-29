import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'
import createSagaMiddleware from 'redux-saga'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import auth from './store/reducers/auth'
import burgerBuilder from './store/reducers/burgerBuilder'
import order from './store/reducers/order'
import {watchAuth, watchBurgerBuilder, watchOrder} from './store/sagas'

const rootReducer = combineReducers({auth, burgerBuilder, order})
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrder)

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
