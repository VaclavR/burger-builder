import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import Auth from './containers/Auth/Auth'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

function App() {
    return (
        <BrowserRouter>
            <div>
                <Layout>
                    <Switch>
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/orders' component={Orders} />
                        <Route path='/auth' component={Auth} />
                        <Route path='/' exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        </BrowserRouter>
    )
}

export default App
