import React from 'react'
import {
    Route, Redirect
} from '../x-react-router-dom'
import { connect } from '../react-redux/react-redux'
// import {
//     Route, Redirect
// } from 'react-router-dom'
// import { connect } from 'react-redux'

function PrivateRoute({ isLogin, component: Component, ...restProps }) {
    console.log('isLogin', isLogin); //log
    return <Route
        {...restProps}
        render={(props) =>
            isLogin
                ?
                (<Component {...props} />)
                :
                (<Redirect
                    to={{ pathname: "/login", state: { from: props.location.pathname } }}
                />)
        }
    />
}
export default connect(({ user }) => ({ isLogin: user.isLogin }))(PrivateRoute)

