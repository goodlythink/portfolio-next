import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/Basepage'
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm'

import { Row, Col } from 'reactstrap';
import withAuth from '../components/hoc/withAuth'

import { createPortfolio } from '../../actions'
import { Router } from '../../routes'
import moment from 'moment';

const INITIAL_VALUES = { title: '', company: '', location: '', position: '', description: '', startDate: moment(), endDate: moment() }
class PortfolioNew extends React.Component {
    constructor(props) {
        super();

        this.savePortfolio = this.savePortfolio.bind(this)
        this.state = { error: undefined }
    }

    savePortfolio(portfolioData, { setSubmitting }) {
        setSubmitting(true);

        // alert(JSON.stringify(portfolioData, null, 2));
        createPortfolio(portfolioData)
            .then((portfolio) => {
                // console.log(portfolio);
                setSubmitting(false);
                this.setState({ error: undefined })
                Router.pushRoute('/portfolios')
            })
            .catch((err) => {
                const error = err.message || 'Server Error!'
                setSubmitting(false);
                this.setState({ error })
                console.error(err)
            })
    }
    render() {
        const { error } = this.state
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-create-page" title="Create New Portfolio">
                    <Row>
                        <Col md="6">
                            <PortfolioCreateForm initialValues={INITIAL_VALUES} error={error} onSubmit={this.savePortfolio} />
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(PortfolioNew)