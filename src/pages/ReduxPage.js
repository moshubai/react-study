import React, {Component} from "react";
import store from "../store/";
// 不使用react-redux 中间件的情况下

export default class ReduxPage extends Component {
  componentDidMount() {
    // store发生变化之后，执行subscribe的监听函数
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    // 取消订阅
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = () => {
    // 修改状态
    store.dispatch({type: "ADD"});
  };

  asyAdd = () => {
    // 不使用中间件
    // setTimeout(() => {
    //   store.dispatch({type: "ADD"});
    // }, 1000);
    //
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({type: "ADD"});
      }, 1000);
    });
  };

  promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        type: "MINUS",
        payload: 100,
      })
    );
  };

  addFn = () => {
    store.dispatch({
      type: "ADD",
      payload: 100,
    });
  }

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().count}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.promiseMinus}>asyAdd</button>
        <button onClick={this.addFn}>简单的第二个</button>
      </div>
    );
  }
}
