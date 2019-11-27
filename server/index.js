
const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const routes = require('../routes')

// SERVICE
const authService = require('./services/auth')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)


const secretData = [
    {
        title: 'SecretData 1',
        description: 'Plans how to build spaceship'
    },
    {
        title: 'SecretData 2',
        description: 'My secret passwords'
    }
]

mongoose.connect('mongodb+srv://goodlythink:itzone1234@cluster0-ryfbi.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.error(err))

app.prepare()
    .then(() => {
        const server = express();

        server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
            return res.json(secretData);
        })

        server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
            return res.json(secretData);
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.use(handle).listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })