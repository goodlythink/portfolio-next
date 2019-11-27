import Router, { WithRouter } from 'next/router'
import auth0 from 'auth0-js'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

import { getCookieFromReq } from '../helpers/utils'

class Auth0 {
    constructor() {
        // this.auth0 = new auth0.WebAuth({
        //     domain: 'goodlythink.auth0.com',
        //     clientID: 'otQ1movcHE3TxqvWQ5XaSgLA6GwIzEmN',
        //     redirectUri: 'http://localhost:300',
        //     responseType: 'token id_token',
        //     scope: 'openid'
        // })

        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        // this.handleAuthentication = this.handleAuthentication.bind(this)
    }

    // handleAuthentication() {
    //     this.auth0.parseHash((err, authResult) => {
    //         if (authResult && authResult.accessToken && authResult.idToken) {
    //             this.setSession(authResult)
    //         } else if (err) {
    //             console.log(err)
    //         }
    //     })
    // }

    setSession() {
        // const expiresAt = 600000 + new Date().getTime();
        const expiresAt = 3600000 + new Date().getTime();
        const ruleUrl = "http://localhost:3000/role";

        const jwtData = jwt.sign({
            "http://localhost:3000/role": "siteOwner",
            exp: expiresAt,
            data: 'goodlythink',
            name: "ART"
        }, 'art');

        Cookies.set('user', '1234');
        Cookies.set('jwt', jwtData);
        Cookies.set('expiresAt', expiresAt);
    }

    logout() {
        Cookies.remove('user');
        Cookies.remove('jwt');
        Cookies.remove('expiresAt');
        Router.push('/')
    }

    login() {
        this.setSession();
        Router.push('/callback');
    }

    getJWKS() {

    }

    verifyToken(token) {
        if (token) {
            const decodeToken = jwt.decode(token);
            const expiresAt = decodeToken.exp;

            return (decodeToken && new Date().getTime() < expiresAt ? decodeToken : undefined)
        }

        return undefined
    }

    clientAuth() {
        const token = Cookies.get('jwt')
        const verifiedToken = this.verifyToken(token);
        return verifiedToken
    }

    serverAuth(req) {
        if (req.headers.cookie) {

            const token = getCookieFromReq(req, 'jwt')
            const verifiedToken = this.verifyToken(token)

            return verifiedToken
        }

        return undefined
    }
}

const auth0Client = new Auth0();
export default auth0Client;
