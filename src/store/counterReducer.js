// hook useReducer 使用
import { createStore, combineReducers } from 'redux'


// 定义规则
export const counterReducer = (state = 0, { type, payload = 1 }) => {
    switch (type) {
        case 'ADD':
            return state + payload
        case 'MINUS':
            return state - payload
        default:
            return state
    }

}

const store = createStore(combineReducers({ count: counterReducer }))
export default store