import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './store/actions'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import Spinner from './components/UI/Spinner/Spinner'
const Checkout = lazy(() => import('./containers/Checkout/Checkout'))
const Orders = lazy(() => import('./containers/Orders/Orders'))
const Auth = lazy(() => import('./containers/Auth/Auth'))



const App = props => {
    const {onAuthCheckState} = props

    useEffect(() => {
        onAuthCheckState()
    }, [onAuthCheckState])

    let routes = (
        <Suspense fallback={<Spinner />}>
            <Switch>
                <Route path='/auth' component={Auth} />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        </Suspense>
    )

    if (props.isAuthenticated) {
        routes = (
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' component={Orders} />
                    <Route path='/auth' component={Auth} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
            </Suspense>
        )
    }

    return (
        <BrowserRouter>
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState())
    }
}

App.propTypes = {
    onAuthCheckState: PropTypes.func,
    isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
