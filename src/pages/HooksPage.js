// useCallback 缓存函数
// useMemo 缓存参数
import React, { useReducer, useEffect } from 'react'
import { counterReducer } from "../store/counterReducer";
const init = (initArg) => initArg - 0


export default function HooksPage(props) {
    const [state, dispacth] = useReducer(counterReducer, '0', init)

    // didmount  didupdate  willunmount
    useEffect(() => {
        console.log('didMount'); //log
        return () => {
            console.log('willunmount'); //log
        };
    }, []);
    return (
        <React.Fragment>
            <h3>HooksPage</h3>
            <button onClick={() => dispacth({ type: 'ADD' })}>{state}</button>
        </React.Fragment>
    )
}


// react 自身的HooksApi
/*
useState
useEffect
useContext

useReducer 复杂的状态 简单复用
useCallBack 缓存函数
useMemo 缓存参数
useRef


*/