import React from 'react'
import matchPath from './matchPath';
import RouterContext from './RouterContext';

class Switch extends React.Component {

    render() {
        return (
            <RouterContext.Consumer>
                {(context) => {
                    const { location } = context
                    console.log('l===========n',location); //log
                    let match; //标记匹配
                    let element; // 记录匹配到的节点

                    // 使用React.Children.forEach来筛选
                    React.Children.forEach(this.props.children, (child) => {
                        if (match == null) {
                            element = child;
                            match = child.props.path ? matchPath(location.pathname, child.props) : context.match
                        }
                    });
                    // console.log('matchmatchmatchmatch',match); //log
                    return match ? React.cloneElement(element, { computedMatch: match }) : null

                }}
            </RouterContext.Consumer>
        )
    }
}

export default Switch

/*
Switch的作用：匹配。（只匹配并渲染第一个子元素<Route>或<Redirect>与位置匹配的子元素。）


*/