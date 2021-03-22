// import ReactDOM from "react-dom";
// import React, { Component, useState } from 'react'
import "./index.css";
// import App from "./App";
// // import { Provider } from 'react-redux';
// import { Provider } from './react-redux/react-redux';
// import 'antd/dist/antd.css';
// import store from './store';

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>
//     , document.getElementById("root")
// );
// react-redux 是一个react与redux的绑定库，背后原理就是Context





// 简单实现react源码  没有fiber（分片）
// import ReactDOM from './x-react/react-dom'
// import Component from './x-react/Component';



// 简单实现react源码  有fiber（分片）
import ReactDOM, { useState } from './x-fiber-react/react-dom'
import Component from './x-fiber-react/Component';

class ClassComp extends Component {
    render() {
        return (
            <h4>{this.props.title}</h4>
        )
    }
}

function Func() {
    const [Count, setCount] = useState(0);
    return (
        <div>
            <p>函数组件</p>
            <h3 onClick={() => setCount(Count + 1)}>{Count}</h3>
        </div>
        
    )
}

function FragmentComp() {
    return (
        <>
            <h2>FragmentComp</h2>
            <h2>FragmentComp</h2>
        </>
    )
}

const jsx = (
    <div className='title'>
        <h2>react - 源码实现</h2>
        <a href='https://zh-hans.reactjs.org/'>React</a>
        <Func />
        <ClassComp title='类组件' />
        <>
            <h2>FragmentComp</h2>
            <h2>FragmentComp</h2>
        </>
        {/* <div>
            <h2>FragmentComp</h2>
            <h2>FragmentComp</h2>
        </div> */}
        <FragmentComp />
    </div>
)

ReactDOM.render(jsx, document.getElementById("root"))
