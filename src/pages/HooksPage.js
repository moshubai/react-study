// useCallback 缓存函数
// useMemo 缓存参数
import React, { useReducer, useEffect, useLayoutEffect } from 'react'
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

    useLayoutEffect(() => {
        console.log('didMount===useLayoutEffect'); //log
        return () => {
            console.log('willunmount===useLayoutEffect'); //log
        };
    }, []);

    return (
        <React.Fragment>
            <h3>HooksPage</h3>
            <button onClick={() => dispacth({ type: 'ADD' })}>{state}</button>
        </React.Fragment>
    )
}


