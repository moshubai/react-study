## React 面试题

### 什么是虚拟 DOM

> 虚拟 DOM：用于表示 DOM 结构的 js 对象。用 js 对象表示 dom 对象（链表结构）

### React 自身的 HooksApi

> useState 状态(state，以及更新 state 的函数)

> useEffect 方法(Hook 接收一个包含命令式、且可能有副作用代码的函数)

> useContext 属性跨级传递

> useReducer 复杂的状态 简单复用(useReducer 适合修改逻辑复杂且可能公用的状态，因为可以把状态抽取到 reducer 中，方便复用)

> useCallBack 缓存函数

> useMemo 缓存参数

> useRef Dom(获取节点)

> useLayoutEffect 没有延迟，立即执行

## JS 面试题

### 手写节流函数

```js
function throttles(fn, delay = 100) {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}
```

### 手写深拷贝

```js
// 最基础、最简单的
var obj1 = {
  a: 1,
  b: 2,
  c: 3,
};
var objString = JSON.stringify(obj1);
var obj2 = JSON.parse(objString);
obj2.a = 5;
console.log(obj1.a); // 1
console.log(obj2.a); // 5

// =================
var array = [1, 2, 3, 4];
var newArray = $.extend(true, [], array);

// =========
Object.assign();
// ======
lodash的_.cloneDeep();
```

### 手写 Promise all

```js
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    //promises必须是一个数组
    if (!(promises instanceof Array)) {
      throw new TypeError("promises must be an Array");
    }
    var len = promises.length,
      resolvedCount = 0,
      resolvedArray = new Array(len);
    for (var i = 0; i < len; i++) {
      (function (i) {
        Promise.resolve(promises[i])
          .then(
            (value) => {
              resolvedCount++;
              resolvedArray[i] = value;
              if (resolvedCount == len) {
                return resolve(resolvedArray);
              }
            },
            (re) => {
              return reject(re);
            }
          )
          .catch((re) => {
            console.log(re);
          });
      })(i);
    }
  });
}
// https://www.jianshu.com/p/5119e01a036f
```
