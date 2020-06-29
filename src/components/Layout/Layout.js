import React, { Component } from 'react'
import styles from './Layout.module.css'
import PropTypes from 'prop-types'

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <div>Toolbar, SideDrawer, Backdrop</div>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.object
}

export default Layout
