import React from 'react'

import { Component } from 'react';

// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ReduxPage from "../pages/ReduxPage";
import ReactReduxPage from '../pages/ReactReduxPage'
import HooksPage from '../pages/HooksPage'
import HomePage from '../pages/HomePage'
import LoginIn from '../pages/LoginIn'
import PrivateRoute from "./PrivateRoute";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Prompt
} from '../x-react-router-dom'

export const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginIn,
    auth: PrivateRoute,
  },
  {
    path: "/react-redux",
    component: ReactReduxPage,
    auth: PrivateRoute,
  },
  {
    path: "/hook",
    component: HooksPage
  },
  {
    path: "/redux",
    component: ReduxPage
  },
  {
    component: () => { <div>404</div> },
  },
];


export default function Routes() {
  // const [state, setstate] = useState(1);
  return (
    <>
      {/* <button onClick={() => setstate(state + 1)}>加法{state}</button> */}
      {/* <ReduxPage /> */}
      {/* <ReactReduxPage/> */}
      {/* {state % 2 && <HooksPage />} */}
      <Router>
        <Link to='/'>首页</Link> |
        <Link to='/login'>登录</Link> |
        <Link to='/react-redux'>react-redux</Link> |
        <Link to='/redux'>redux</Link> |
        <Link to='/hook'>Hook</Link>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginIn} />
          <PrivateRoute path="/react-redux" component={ReactReduxPage} />
          
          <Route path="/redux" component={ReduxPage} />
          <Route path="/hook" component={HooksPage} />
          {/* <Route  component={404} /> */}
        </Switch>
      </Router>
    </>

  )
}
