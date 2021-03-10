import {
  call,
  put,
  // takeEvery,
  take,
  fork,
} from 'redux-saga/effects';
import LoginService from "../../service/login";
import { LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS } from './Symbol';

/*
redux-saga 是 redux 一个中间件，用于解决异步问题。

异步问题，ajax请求的地域回调，都是头疼的东西。

ES6 Generator 正好解决了这个问题。

最新的ES7  async / await  也解决了异步问题，它们就是Generator的语法糖。非阻塞

redux-saga/effects  明确几个api

fork：创建一个新的进程或者线程，并发发送请求。
call：发送 api 请求
put：发送对应的 dispatch，触发对应的 action
takeEvery：监听对应的 action；每一次 dispatch 都会触发；例如：点击一个新增的按钮，2s 后触发新增动作，在2s内不断点击按钮，这时候，每一次点击，都是有效的。
takeLatest：监听对应的 action；只会触发最后一次 dispatch；例如：点击一个新增的按钮，2s 后触发新增动作，在2s内不断点击按钮，这时候，只有最后一次点击是有效的。
all：跟 fork 一样，同时并发多个 action，没有顺序。



*/




// call ：调用异步操作 dispatch
// put ： 状态更新 dispatch
// takeEvery 做saga监听
// worker saga

function* loginHandle(action) {
  try {
    // 先获取基本信息
    // 阻塞型 call
    let res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({ type: LOGIN_SUCCESS, payload: { ...res2 } });
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, payload: err });
  }
}

// watcher saga
function* loginSaga() {
  yield takeEvery(LOGIN_SAGA, loginHandle);
  // while (true) {
  //   const action = yield take(LOGIN_SAGA);
  //   // 阻塞型 call
  //   // 非阻塞型 fork
  //   yield fork(loginHandle, action);
  //   console.log("哈哈哈哈", action); //sy-log
  // }
}

export default loginSaga;

const takeEvery = (pattern, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  });