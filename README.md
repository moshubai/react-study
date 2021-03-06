### `源码的实现`

```bash
yarn

yarn start
```

### React 面试题

- React 自身的 HooksApi

> useState 状态(state，以及更新 state 的函数)

> useEffect 方法(Hook 接收一个包含命令式、且可能有副作用代码的函数)

> useContext 属性跨级传递

> useReducer 复杂的状态 简单复用(useReducer 适合修改逻辑复杂且可能公用的状态，因为可以把状态抽取到 reducer 中，方便复用)

> useCallBack 缓存函数

> useMemo 缓存参数

> useRef Dom(获取节点)

> useLayoutEffect 没有延迟，立即执行

## 分步实现 react-router-dom

### 安装 react-router-dom

```
yarn add react-router-dom
```

### 新建页面，可以随便创建,将创建的页面导入、并添加路由在 App.js ，如下：

```
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
<Router>
   <Link to='/'>首页</Link> |
   <Link to='/react-redux'>react-redux</Link> |
   <Link to='/redux'>redux</Link> |
   <Link to='/hook'>Hook</Link>
   <Switch>
      <Route exact path="/" children={ChildFn} component={HomePage} />
      <Route path="/react-redux" component={ReactReduxPage} />
      <Route path="/redux" component={ReduxPage} />
      <Route path="/hook" component={HooksPage} />
      {/* <Route  component={404} /> */}
   </Switch>
</Router>
```

### 明确 `react-router-dom Api` 的作用

```
   BrowserRouter : Router的一种，通过使用HTML5提供的history API(pushState,replaceState,propstate)机制来维持页面UI同RUL的统一。
   HashRouter : 使⽤用URL的hash部分（即window.location.hash）来保持UI同RUL的统一。
   MemoryRouter : 把URL的历史记录保存在内存中的 <Router>（不读取、不写⼊地址栏）。在测试和⾮浏览器器环境中很有⽤用，如React Native。
   Router : 路由器，作为中间件传递数据。
   Link : a 链接，跳转页面。
   Switch : 匹配路由（独占路由）。
   Route : 路由，渲染页面（children、component、render）。
   Redirect : 重定向到的URL。
   Prompt : 跳出时，提示。
```

### 实现，`BrowserRouter.js`

> 其实`BrowserRouter`作为区分项目中路由的选择性 API，其作用肯定就是向下传递路径，也就是对象 history。然后子组件监听，并选择其与之相对应的匹配方式。

```
import React from 'react'
import Router from './Router';
import { createBrowserHistory } from 'history';
export default class BrowserRouter extends React.Component {
    constructor(props) {
        super(props);
        this.history = createBrowserHistory()
    }
    componentDidMount() { }
    render() {
        return <Router history={this.history} children={this.props.children} />
    }
}
```

- 1.  组件`Router`作为子组件，并下传递属性和 children。
- 2.  利用`history`这个库的 api 来获取当前路径。

### 实现，`Router.js`

- 1.  作为路由器，也就是一个最上级的路由控制件。其作用就是初始化路由，并监听路由，然后将数据传递下去，触发更新。
- 2.  因为要触发更新，且需要向子组件传递数据，而子组件为多层级（Link、Switch、Route 等），则需要使用 API`context`。

```
import React from 'react';
const RouterContext = React.createContext()
export default RouterContext
```

- 3. 创建后，组件`Router`便可以使用，并向子组件传递属性。

```
<RouterContext.Provider
    value={{
       history: this.props.history,
       location: this.state.location,
       match: Router.computeRootMatch(this.state.location.pathname),
    }
    }
>
    { this.props.children}
</RouterContext.Provider >
```

- 4. 处理监听，并复制

```
  props.history.listen((location) => {
      this.setState({
            location
      })
   })
```

- 5.  初始化路径（每次打开页面需要初始化路径，才能显示）。

```
static computeRootMatch(pathname) {
     return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }
```

### 实现`Link.js`

- 1. 根据路径可知，该组件起的作用定时那<a href=""><a/>。
- 2. 所以实现 a 跳转，并去除刷新，即可完成此组件。

```
const handleClick = (event) => {
   event.preventDefault();
   context.history.push(to)
}
...
<a href={to} onClick={handleClick} {...restProps}>{children}</a>
```

### 实现`Route.js`

- 1. 该组件最主要的作用就是渲染页面，但是源码中给了三个属性：`children、component、render`。这三个属性均可实现组件（页面）的渲染。

```
<Route exact path="/" children={ChildFn}  />
<Route exact path="/"  component={HomePage} />
<Route exact path="/" render={() => <div>Home</div>} />
```

- 2. 路由配置并匹配检测渲染、传递属性及`store`。

```
const { location } = context
const { path, children, component, render, computedMatch } = this.props
const match = computedMatch
   ? computedMatch : path
         ? matchPath(location.pathname, this.props) : context.match;
```

- 3. 无论写 `children、component、render` 中的哪一个，都会渲染，那么为什么会有三个呢？源码是这样的：

```
<RouterContext.Provider value={props}>
   {props.match
      ? children
      ? typeof children === "function"
         ? __DEV__
            ? evalChildrenDev(children, props, this.props.path)
            : children(props)
         : children
      : component
      ? React.createElement(component, props)
      : render
      ? render(props)
      : null
      : typeof children === "function"
      ? __DEV__
      ? evalChildrenDev(children, props, this.props.path)
      : children(props)
      : null}
</RouterContext.Provider>
```

> 可见，匹配的顺序是`children>component>render`。

### 实现`Switch.js`

- 1. 作用是匹配（独占）路由，白话说就是：遇见第一个一样的，我就渲染与路径，无论是 <Route> 或 <Redirect> 。
- 2. 反之，没有则匹配 404.

```
<Route path="/about" component={About} />
<Route path="/:user" component={User} />
<Route component={404} />
```
> 如果URL是`/about`时，`<Switch>` 将开始寻找匹配的`<Route>` 。此时找到第一个<Route
path="/about" /> 将会被正确匹配，并渲染，然后，后面的便不再渲染，这就是独占。其原理就是：利用React原生API`React.Children.forEach`递归，并定位当前的child
```
React.Children.forEach(this.props.children, (child) => {
   if (match == null) {
         element = child;
         match = child.props.path ? matchPath(location.pathname, child.props) : context.match
   }
});
```
### 最后，就是整理思路。
- 1. 明确API的作用和数据的流向。
- 2. 利用可复用的组件和路径的匹配进行匹配并渲染。