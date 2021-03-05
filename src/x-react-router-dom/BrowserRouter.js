import React from 'react'
import Router from './Router';
import { createBrowserHistory } from 'history';

export default class BrowserRouter extends React.Component {
    constructor(props) {
        super(props);
        this.history = createBrowserHistory()
    }
    componentDidMount() { }
    render() {
        // const { } = this.props;
        return <Router history={this.history} children={this.props.children} />
    }
}
