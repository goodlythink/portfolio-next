const Portfolio = require('../models/portfolio')

exports.getPortfolios = (req, res) => {
  Portfolio.find({}).sort({ 'startDate': 1 }).exec((err, allPortfolio) => {
    if (err) {
      return res.status(422).send(err)
    }

    return res.json(allPortfolio);
  })
}

exports.getPortfolioById = (req, res) => {
  const portfolioId = req.params.id;

  Portfolio.findById(portfolioId)
    .select('-__v')
    .exec((err, foundPortfolio) => {
      if (err) {
        return res.status(422).send(err)
      }

      return res.json(foundPortfolio);
    })
}

exports.savePortfolios = (req, res) => {
  const portfolioData = req.body;

  const userId = req.user && req.user.sub;
  const portfolio = Portfolio(portfolioData);
  portfolio.userId = userId

  portfolio.save((err, createPortfolio) => {
    if (err) {
      return res.status(422).send(err)
    }

    return res.json(createPortfolio)
  })
}


exports.updatePortfolio = (req, res) => {
  const portfolioId = req.params.id;
  const portfolioData = req.body;

  Portfolio.findById(portfolioId, (err, foundPortfolio) => {
    if (err) {
      return res.status(422).send(err)
    }

    foundPortfolio.set(portfolioData);
    foundPortfolio.save((err, savedPortfolio) => {
      if (err) {
        return res.status(422).send(err)
      }
      return res.json(savedPortfolio)
    })
  })
}

exports.deletePortfolio = (req, res) => {
  const portfolioId = req.params.id;

  Portfolio.deleteOne({ _id: portfolioId }, (err, deletedPortfolio) => {
    if (err) {
      return res.status(422).send(err)
    }
    return res.json({ status: 'DELETED' })
  })
}