import React from 'react'
// 跨层级数据传递
// 分三步走
// * 1 ：创建一个context对象
const Context = React.createContext();

// * 2 ：使用Provider传递value
export function Provider({ store, children }) {
    return <Context.Provider value={store}>{children}</Context.Provider>
}

// * 3 : 子组件消费context value ：Consumer、contextType、useContext
// contextType只能使用在类组件中，并且只能订阅单一的context来源
// useContext只能用在函数组建和自定义hook中


// hoc 是个函数，接受组件作为参数，并且返回一个新的组件。
export const connect = (
    mapStateToProps = (state) => state,
    mapDispatchToProps
) => (WrappedComponent) => (props) => {
    const stateProps = {}
    const dispatchProps = {}
    return <WrappedComponent {...props} />
}

// 中间件
function bindActionCreator(creators, dispatch) {

    return (...args) => {
        console.log(...args, 5555555555555, creators);
        return dispatch(creators(...args))
    }

}

export function bindActionCreators(creators, dispatch) {

    let obj = {}
    for (let key in creators) {

        obj[key] = bindActionCreator(creators[key], dispatch)
    }

    return obj

}