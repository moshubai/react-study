import React from 'react'
import Router from './Router';
import { createBrowserHistory } from 'history';

class BrowserRouter extends React.Component {
    constructor(props) {
        super(props)
        this.history = createBrowserHistory()
    }
    componentDidMount() { }
    render() {
        // const { } = this.props;
        return (
            <React.Fragment>
                <Router history={this.istory} children={this.props.children} />
            </React.Fragment>
        )
    }
}

export default BrowserRouter