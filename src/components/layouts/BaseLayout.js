import React from 'react'
import Header from '../shared/Header'
import BasePage from '../Basepage';

const BaseLayout = (props) => {
    const { children, isAuthenticated, user } = props;
    const className = props.className || '';
    const headerType = props.headerType || 'default'

    return (
        <div className="layout-container">
            <Header className={`port-nav-${headerType}`} isAuthenticated={isAuthenticated} user={user} />
            <main className={`cover ${className}`}>
                <div className="wrapper">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default BaseLayout;