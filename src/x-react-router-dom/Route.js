import React from 'react'
import matchPath from './matchPath';
import RouterContext from './RouterContext';

class Route extends React.Component {
    componentDidMount() { }
    render() {
        return (
            <RouterContext.Consumer>
                {(context) => {
                    // console.log('context', context, this.props); //log
                    const { location } = context
                    const { path, children, component, render, computedMatch } = this.props
                    const match = computedMatch
                        ? computedMatch : path
                            ? matchPath(location.pathname, this.props) : context.match;
                    const props = {
                        ...context,
                        match,
                    }

                    // console.log('component',component); //log
                    return (
                        <RouterContext.Provider value={props}>
                            {
                                match
                                    ? children
                                        ? typeof children === 'function' ? children(props) : children : component
                                            ? React.createElement(component, props) : render
                                                ? render(props) : null
                                    : typeof children === 'function' ? children(props) : null

                            }
                        </RouterContext.Provider>
                    )

                }}
            </RouterContext.Consumer>
        )
    }
}

export default Route