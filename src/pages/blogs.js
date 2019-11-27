import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/Basepage'

class Blog extends React.Component {

    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>I am Blogs Page</h1>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default Blog
