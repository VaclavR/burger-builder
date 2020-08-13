import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {
    const [isSidedrawerVisible, setSidedrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        setSidedrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        setSidedrawer(!isSidedrawerVisible)
    }

    return (
        <React.Fragment>
            <Toolbar
                isOpen={isSidedrawerVisible}
                isAuthenticated={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isOpen={isSidedrawerVisible}
                isAuthenticated={props.isAuthenticated}
                closedHandler={sideDrawerClosedHandler} />
            <main className={styles.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    }
}


Layout.propTypes = {
    children: PropTypes.object,
    isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps)(Layout)
