import React, {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './store/actions'
import Layout from './hoc/Layout/Layout'
import Auth from './containers/Auth/Auth'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Logout from './containers/Auth/Logout/Logout'

class App extends Component {
    componentDidMount() {
        this.props.onAuthCheckState()
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/auth' component={Auth} />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        )

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' component={Orders} />
                    <Route path='/auth' component={Auth} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
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
