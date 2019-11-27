import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/Basepage'

import withAuth from '../components/hoc/withAuth'
import { getSecretData, getSecretDataServer } from '../../actions'

class Secret extends React.Component {
    static async getInitialProps({ req }) {
        const anotherSecretData = await getSecretData(req)
        return { anotherSecretData }
    }

    displaySecretData() {
        const { anotherSecretData } = this.props
        if (anotherSecretData && anotherSecretData.length > 0) {
            return anotherSecretData.map((data, i) => {
                return (
                    <div key={i}>
                        <p>{data.title}</p>
                        <p>{data.description}</p>
                    </div>
                )
            })
        }
        return null;
    }

    render() {
        return (
            <BaseLayout  {...this.props.auth}>
                <BasePage>
                    <h1>I am Secret Page</h1>
                    <p>Secret Content here</p>
                    {this.displaySecretData()}
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth()(Secret)
