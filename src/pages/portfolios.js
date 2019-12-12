import React from 'react'
import { Col, Row, Button } from 'reactstrap'

import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/Basepage'

import { Router } from '../../routes'

import { getPortfolios, deletePortfolio } from '../../actions';
import PortfolioCard from '../components/portfolios/PortfolioCard'

class Portfolios extends React.Component {
    static async getInitialProps() {
        // let posts = []
        // try {
        //     const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        //     posts = response.data
        // } catch (err) {
        //     console.log(err)
        // }

        // return { posts: posts.slice(0, 10) }

        let portfolios = [];
        try {
            portfolios = await getPortfolios();
        } catch (err) {
            // console.error('portfolios=>', err);
        }

        return { portfolios }
    }

    navigateToEdit(portfolioId, e) {
        e.stopPropagation();
        Router.pushRoute(`/portfolio/${portfolioId}/edit`)
    }

    displayDeleteWarning(portfolioId, e) {
        e.stopPropagation();
        const isConfirm = confirm('Are you sure Delete');
        if (isConfirm) {
            this.deletePortfolio(portfolioId)
        }
    }

    deletePortfolio(portfolioId) {
        deletePortfolio(portfolioId).then(() => {
            Router.pushRoute('/portfolios')
        }).catch(err => console.error(err))
    }


    renderPortfolio(portfolios) {
        const { isAuthenticated, isSiteOwner } = this.props.auth
        return portfolios.map((portfolio, index) => {
            return (
                <Col md="4" key={index}>
                    <PortfolioCard portfolio={portfolio}>
                        {isAuthenticated && isSiteOwner &&
                            <React.Fragment>
                                <Button onClick={(e) => this.navigateToEdit(portfolio._id, e)} color="warning">Edit</Button>{' '}
                                <Button onClick={(e) => this.displayDeleteWarning(portfolio._id, e)} color="danger">Delete</Button>
                            </React.Fragment>
                        }
                    </PortfolioCard>
                </Col>
            )
        })
    }

    render() {
        const { portfolios } = this.props
        const { isAuthenticated, isSiteOwner } = this.props.auth

        return (
            <BaseLayout  {...this.props.auth} title="Portfolio">
                <BasePage className="portfolio-page" title="Portfolios">
                    {isAuthenticated && isSiteOwner && <Button onClick={() => Router.pushRoute('/portfolioNew')} color="success" className="create-port-btn">Create Portfolio</Button>}
                    <Row>{this.renderPortfolio(portfolios)}</Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default Portfolios