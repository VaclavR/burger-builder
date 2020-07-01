import React from 'react'
import PropTypes from 'prop-types'
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = props => (
    <React.Fragment>
        <Toolbar />
        <main className={styles.Content}>
            {props.children}
        </main>
    </React.Fragment>
)


layout.propTypes = {
    children: PropTypes.object
}

export default layout
