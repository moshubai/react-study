import React from 'react'
import {
    withRouter,
    Link,
    Prompt
} from '../x-react-router-dom'

@withRouter
class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { confirm: true }
    }
    componentDidMount() { }
    change = () => {
        this.setState({
            confirm: false
        })
    }
    render() {
        return (
            <div>
                <h3>HomePage</h3>
                <p onClick={this.change}>改变</p>
                <Link to="/redux">Redux</Link>
                <Prompt when={this.state.confirm} message='你确定要离开吗？' />
            </div>
        );
    }
}

export default HomePage