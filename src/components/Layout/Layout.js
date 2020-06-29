import React from 'react'
import styles from './Layout.module.css'
import PropTypes from 'prop-types'

const layout = (props) => {
    return (
        <React.Fragment>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={styles.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

layout.propTypes = {
    children: PropTypes.object
}

export default layout
