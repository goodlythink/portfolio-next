import Router, { WithRouter } from 'next/router'
import auth0 from 'auth0-js'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

import { getCookieFromReq } from '../helpers/utils'

const CLIENT_ID = process.env.CLIENT_ID
class Auth0 {
    constructor() {
        // this.auth0 = new auth0.WebAuth({
        //     domain: 'goodlythink.auth0.com',
        //     clientID: CLIENT_ID,
        //     redirectUri: `${process.env.BASE_URL}/callback`,
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
        const ruleUrl = process.env.NAMESPACE + "/role";

        console.log(ruleUrl);
        const jwtData = jwt.sign({
            [ruleUrl]: "siteOwner",
            exp: expiresAt,
            data: 'goodlythink',
            name: "ART",
            sub: "001"
        }, 'art');

        Cookies.set('jwt', jwtData);
    }

    logout() {
        Cookies.remove('jwt');
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
