// 定义修改规则
// import {HandleThunkActionCreator} from 'react-redux';
const userInit = {
    isLogin: false,
    userInfo: { id: null, username: "", password: '', score: 0 },
    loading: false,
    err: { msg: "" }
};
const loginReducer = (state = { ...userInit }, { type, payload }) => {
    switch (type) {
        case "REQUEST":
            return { ...state, loading: true };
        case "LOGIN_SUCCESS":
            return { ...state, isLogin: true, loading: false, userInfo: { ...payload } };
        case "LOGIN_FAILURE":
            return { ...state, ...userInit, ...payload };
        case "LOGOUT_SUCCESS":
            return { ...state, isLogin: false, loading: false };
        default:
            return state;
    }
}

export default loginReducer