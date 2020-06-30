import React from 'react'
import PropTypes from 'prop-types'
import styles from './Layout.module.css'

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
