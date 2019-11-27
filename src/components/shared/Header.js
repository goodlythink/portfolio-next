import React, { useState } from 'react';
import Link from 'next/link'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import auth0 from '../../../services/auth0'
import { userInfo } from 'os';

const BsNavLink = (props) => {
    const { route, title } = props;
    return (
        <Link href={route}>
            <a className="nav-link port-navbar-link"> {title} </a>
        </Link>
    )
}

const Login = () => {
    return (
        <span onClick={auth0.login} className="nav-link port-navbar-link clickable"> Login </span>
    )
}
const Logout = () => {
    return (
        <span onClick={auth0.logout} className="nav-link port-navbar-link clickable"> Logout </span>
    )
}

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const { isAuthenticated, user, className } = props

    return (

        <div>
            <Navbar className={`port-navbar port-nav-base absolute ${className}`} color="transparent" light expand="md">
                <NavbarBrand className="port-navbar-brand" href="/">ART Family</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="port-navbar-item">
                            <BsNavLink route="/" title="Home" />
                        </NavItem>
                        <NavItem className="port-navbar-item">
                            <BsNavLink route="/about" title="About" />
                        </NavItem>
                        <NavItem className="port-navbar-item">
                            <BsNavLink route="/portfolios" title="Portfolios" />
                        </NavItem>
                        <NavItem className="port-navbar-item">
                            <BsNavLink route="/blogs" title="blogs" />
                        </NavItem>
                        <NavItem className="port-navbar-item">
                            <BsNavLink route="/cv" title="cv" />
                        </NavItem>
                        {
                            !isAuthenticated &&
                            <NavItem className="port-navbar-item">
                                <Login />
                            </NavItem>
                        }
                        {
                            isAuthenticated &&
                            <NavItem className="port-navbar-item">
                                <Logout />
                            </NavItem>
                        }
                        {
                            isAuthenticated &&
                            <NavItem className="port-navbar-item">
                                <span className="nav-link port-navbar-link"> {user.name} </span>
                            </NavItem>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;