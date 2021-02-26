import React, { Component } from "react";
// import store from "../store/";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactReduxHookPage from './ReactReduxHookPage'

@connect(
    // mapStateToProps
    // ({count})=>({count})
    (state) => ({ count: state.count, num: state.count2.num }),
    // mapDispatchToProps
    dispatch => {
        let creators = {
            add: () => ({ type: "ADD" }),
            minus: () => ({ type: "MINUS" }),
            addFn: () => ({ type: "ADDFN", payload: 100 }),
        }
        creators = bindActionCreators(creators, dispatch)
        return { dispatch, ...creators }
    }

)
class ReduxPage extends Component {
    componentDidMount() {

    }

    componentWillUnmount() {

    }



    render() {
        console.log('this.props', this.props); //log
        const { count, num, add, minus,addFn } = this.props
        return (
            <div>
                <h3>ReduxPage</h3>
                <p>{count}</p>
                <p>{num}</p>
                <button onClick={add}>加法</button>
                <button onClick={minus}>减法</button>
                <button onClick={addFn}>简单的第二个</button>
                <ReactReduxHookPage/>
            </div>
        );
    }
}

export default ReduxPage