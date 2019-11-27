import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/Basepage'

class Callback extends React.Component {
    render() {
        return (
            <BaseLayout  {...this.props.auth}>
                <BasePage>
                    <h1>Verifying login data</h1>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default Callback
