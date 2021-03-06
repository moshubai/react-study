import React from 'react'
import RouterContext from './RouterContext';

class Router extends React.Component {
    static computeRootMatch(pathname) {
        return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
    }
    constructor(props) {
        super(props)
        this.state = {
            location: props.history.location
        }
        // 监听 location
        this.unlisten = props.history.listen((location) => {
            this.setState({
                location
            })
        })
    }
    componentDidMount() { }
    componentWillUnmount() {
        this.unlisten()
    }
    render() {
        return (
            <RouterContext.Provider
                value={{
                    history: this.props.history,
                    location: this.state.location,
                    match: Router.computeRootMatch(this.state.location.pathname),
                }
                }
            >
                { this.props.children}
            </RouterContext.Provider >

        )
    }
}
export default Router