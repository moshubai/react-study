import React from 'react'
import RouterContext from './RouterContext';

class Router extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            location: props.history.location
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <RouterContext.Provider
                value={{
                    history: this.props.history,
                    location: this.state.location,
                }
                }
            >
                { this.props.children}
            </RouterContext.Provider >


        )
    }
}

export default Router