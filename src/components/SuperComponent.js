import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'

class SuperComponent extends React.Component {
    super() {
        this.someVariable = 'Just Some variable';
    }

    alertName(title) {
        alert(title)
    }
    render() {
        return (
            <BaseLayout>
                <h1>I am SuperComponent</h1>
            </BaseLayout>
        )
    }
}

export default SuperComponent