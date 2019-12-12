const routes = require('next-routes')

module.exports = routes()
    .add('portfolioNew', '/portfolio/new')
    .add('portfolio', '/portfolio/:id')
    .add('portfolioEdit', '/portfolio/:id/edit')                  