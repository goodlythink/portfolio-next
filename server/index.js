
const express = require('express')
const path = require('path')
const next = require('next')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('../routes')

// SERVICE
const authService = require('./services/auth')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)
const config = require('./config')

const bookRoutes = require('./routes/book')
const portfolioRoutes = require('./routes/portfolio')

const robotsOption = {
    root: path.join(__dirname, "../static"),
    headers: {
        'Content-Type': 'text/plan;charset=UTF-8'
    }
}
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

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.error(err))

// async () => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true }))();

app.prepare()
    .then(() => {
        const server = express();
        server.use(bodyParser.json())

        server.use('/api/v1/books', bookRoutes);
        server.use('/api/v1/portfolios', portfolioRoutes);

        server.get('/robots.txt', (req, res) => {
            return res.status(200).sendFile('robots.txt', robotsOption);
        })

        server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
            return res.json(secretData);
        })

        server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
            return res.json(secretData);
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })


        // server.use(function(err, req, res, next){
        //     if(err.name === 'UnauthorizedError'){
        //         res.status(401).send({title: 'Unauthorized', detail: 'Unauthorized Access!'})
        //     }
        // })

        server.use(handle).listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on port :${port}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })