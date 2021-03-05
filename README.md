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

### 新建页面，可以随便创建,将创建的页面导入、并添加路由在 App.js 页面，如下：

[图]

### 明确 react-router-dom Api 的作用

```
   BrowserRouter : Router的一种，通过使用HTML5提供的history API(pushState,replaceState,propstate)机制来维持页面UI同RUL的统一。
   Router :
   Link :
   Switch :
   Route :
   Router :

   Router :
   Router :
   Router :
   Router :
   Router :
   Router :
   Router :
```
