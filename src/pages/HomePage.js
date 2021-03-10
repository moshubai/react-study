import React from 'react'
import {
    withRouter,
    Link,
    Prompt
} from '../x-react-router-dom'
import { connect } from '../react-redux/react-redux'
// import {connect} from 'react-redux';
// import {
//     withRouter,
//     Link,
//     Prompt
// } from 'react-router-dom'

@withRouter
@connect(
    ({user}) => ({isLogin: user.isLogin, userInfo: user.userInfo}),
)

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
        const { userInfo } = this.props
        return (
            <div>
                <h3>HomePage</h3>
                <p>{userInfo.username}</p>
                <p onClick={this.change}>改变</p>
                <Link to="/redux">Redux</Link>
                <Prompt when={this.state.confirm} message='你确定要离开吗？' />
            </div>
        );
    }
}

export default HomePage