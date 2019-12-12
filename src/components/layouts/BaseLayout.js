import React from 'react'
import Header from '../shared/Header'
import Head from 'next/head'

const BaseLayout = (props) => {
    const { children, isAuthenticated, user } = props;
    const className = props.className || '';
    const headerType = props.headerType || 'default'
    const title = props.title || 'ไม่ระบุ';

    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
                <meta name="description" content="My Sample Web By Next.JS is cool" />
                <meta name="keywords" content="nextjs" />
                <meta property="og:title" content="this web cool" />
                <meta property="og:local" content="th_Th" />
                <meta property="og:url" content={`${process.env.BASE_URL}`} />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="My Sample Web By Next.JS is cool" />

                <link rel="icon" type="image/ico" href="/static/favicon.ico" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" integrity="sha384-KA6wR/X5RY4zFAHpv/CnoG2UW1uogYfdnP67Uv7eULvTveboZJg0qUpmJZb5VqzN" crossOrigin="anonymous" />>
            </Head>
            <div className="layout-container">
                <Header className={`port-nav-${headerType}`} isAuthenticated={isAuthenticated} user={user} />
                <main className={`cover ${className}`}>
                    <div className="wrapper">
                        {children}
                    </div>
                </main>
            </div>
        </React.Fragment>
    )
}

export default BaseLayout;