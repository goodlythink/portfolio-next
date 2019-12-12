const express = require('express');
const router = express.Router();

const portfolioCtrl = require('../controllers/portfolio')
// SERVICE
const authService = require('../services/auth')


router.post('', authService.checkJWT, authService.checkRole('siteOwner'), portfolioCtrl.savePortfolios)

router.get('/:id', portfolioCtrl.getPortfolioById)

router.get('', portfolioCtrl.getPortfolios)

router.patch('/:id', authService.checkJWT, authService.checkRole('siteOwner'), portfolioCtrl.updatePortfolio)

router.delete('/:id', authService.checkJWT, authService.checkRole('siteOwner'), portfolioCtrl.deletePortfolio)
module.exports = router;