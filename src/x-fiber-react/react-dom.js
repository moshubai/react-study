import { Placement, Update } from "./const";
// 下一个要执行的任务
let nextUnitOfWork = null; // fiber
let wipRoot = null; //初始化（根）时的fiber
let currentRoot = null;
// 进行中的fiber
let wipFiber = null;

// ! fiber是个js对象
// !  fiber节点的属性
// child 第一个子节点
// sibling 下一个兄弟节点
// return 父节点
// stateNode 在原生标签里，指的就是dom节点
// alternate 记录老fiber
// !

// vnode  虚拟dom节点
// node dom节点


function render(vnode, container) {
    // console.log('vnode', vnode); //log

    // const node = createNode(vnode)

    // container.appendChild(node)
    wipRoot = {
        type: 'div',
        props: { children: { ...vnode } },
        stateNode: container
    }
    nextUnitOfWork = wipRoot
}



function performUnitOfWork(workInProgress) {
    // step 1 执行当前任务
    const { type } = workInProgress
    if (typeof type === 'string') {
        updateHostComponent(workInProgress)
    } else if (typeof type === "function") {

        type.prototype.isReactComponent
            ? updateClassComponent(workInProgress)
            : updateFunctionComponent(workInProgress);

    } else {
        // console.log('typetypetypetype', type); //log
        createFragmentComponent(workInProgress)
    }

    // step 2 返回下一个任务，
    // 如果有子节点，传给子节点
    if (workInProgress.child) {
        return workInProgress.child
    }

    let nextFiber = workInProgress
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.return
    }



}

function workLoop(IdleDeadline) {
    while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
        //执行任务链
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    // 没有任务，就可以提交了 commit

    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop);
}


// 在浏览器的空闲时段内调用的函数排队

/*

window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。
这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，
如动画和输入响应。函数一般会按先进先调用的顺序执行，
然而，如果回调函数指定了执行超时时间timeout，
则有可能为了在超时前执行函数而打乱执行顺序。
*/
requestIdleCallback(workLoop);

function commitRoot() {
    commitWorker(wipRoot.child)

    currentRoot = wipRoot;
    wipRoot = null
}



function commitWorker(workInProgress) {
    // 提交自己 提交孩子 提交兄弟
    if (!workInProgress) {
        return;
    }
    // 自己 先
    // parentNode  dom节点
    // 明确：并不是所有的fiber都有dom节点，如：函数组件、类组件、Provider等
    let parentNodeFiber = workInProgress.return
    // 有些节点是没有dom节点的
    while (!parentNodeFiber.stateNode) {
        parentNodeFiber = parentNodeFiber.return
    }

    let parentNode = parentNodeFiber.stateNode

    // 新增
    // if (workInProgress.stateNode) {
    //     parentNode.appendChild(workInProgress.stateNode)
    // }
    // 插入
    if (workInProgress.flag & Placement && workInProgress.stateNode) {
        parentNode.appendChild(workInProgress.stateNode);
    } else if (workInProgress.flag & Update && workInProgress.stateNode) {
        // 更新属性
        updateNode(
            workInProgress.stateNode,
            workInProgress.alternate.props,
            workInProgress.props
        );
    }

    commitWorker(workInProgress.child)
    commitWorker(workInProgress.sibling)
}








//=========================================================

function isStringOrNumber(str) {
    return typeof str === 'string' || typeof str === 'number'
}

function createNode(workInProgress) {
    const { type, props } = workInProgress
    // 创建元素，
    let node = document.createElement(type)
    // 更新元素上的属性
    updateNode(node, {}, props);
    return node
}
// 
function createFragmentComponent(workInProgress) {
    // console.log('===================='); //log
    // const node = document.createDocumentFragment()
    reconcileChildren(workInProgress, workInProgress.props.children)
}
// 函数组件


/*
含数组件的typeof 是function
*/
function updateFunctionComponent(workInProgress) {
    // console.log('workInProgress', workInProgress); //log

    // 此处相当于给wipFiber初始化赋值和清空记录
    wipFiber = workInProgress
    wipFiber.hooks = []
    wipFiber.hookIndex = 0



    const { type, props } = workInProgress;
    const child = type(props)
    reconcileChildren(workInProgress, child)
}

// 类组件
function updateClassComponent(workInProgress) {
    const { type, props } = workInProgress;
    const instance = new type(props);
    const child = instance.render();
    reconcileChildren(workInProgress, child)
}


function updateHostComponent(workInProgress) {
    if (!workInProgress.stateNode) {
        // dom 节点
        workInProgress.stateNode = createNode(workInProgress)
    }
    // 协调子节点  也就是重组子节点
    reconcileChildren(workInProgress, workInProgress.props.children)
    // console.log("workInProgress", workInProgress); //sy-log
}


// function updateNode(node, nextVal) {
//     Object.keys(nextVal).forEach((k) => {
//         if (k === 'children') {
//             if (isStringOrNumber(nextVal[k])) {
//                 node.textContent = nextVal[k]
//             }
//         } else {
//             // 直接复制，属性没考虑
//             node[k] = nextVal[k]
//         }
//     })
// }
function updateNode(node, prevVal, nextVal) {
    Object.keys(prevVal)
        .forEach((k) => {
            if (k === "children") {
                // 有可能是文本
                if (isStringOrNumber(prevVal[k])) {
                    node.textContent = "";
                }
            } else if (k.slice(0, 2) === "on") {
                const eventName = k.slice(2).toLocaleLowerCase();
                node.removeEventListener(eventName, prevVal[k]);
            } else {
                if (!(k in nextVal)) {
                    node[k] = "";
                }
            }
        });

    Object.keys(nextVal)
        .forEach((k) => {
            if (k === "children") {
                // 有可能是文本
                if (isStringOrNumber(nextVal[k])) {
                    node.textContent = nextVal[k] + "";
                }
            } else if (k.slice(0, 2) === "on") {
                const eventName = k.slice(2).toLocaleLowerCase();
                node.addEventListener(eventName, nextVal[k]);
            } else {
                node[k] = nextVal[k];
            }
        });
}





function reconcileChildren(workInProgress, children) {
    console.log('workInProgress, children', workInProgress, children); //log

    // 文本，数字，不能做处理
    if (isStringOrNumber(children)) {
        return
    }
    const newChildren = Array.isArray(children) ? children : [children]

    let previousNewFiber = null

    // 老fiber的头结点
    let oldFiber = workInProgress.alternate && workInProgress.alternate.child

    for (let i = 0; i < newChildren.length; i++) {
        let child = newChildren[i];
        let same =
            child &&
            oldFiber &&
            child.type === oldFiber.type &&
            child.key === oldFiber.key;
        let newFiber;
        if (same) {
            // 复用
            newFiber = {
                key: child.key, // 属性的标记节点
                type: child.type,
                props: { ...child.props }, //属性
                stateNode: oldFiber.stateNode,
                child: null,
                sibling: null,
                return: workInProgress,
                alternate: oldFiber, // 老节点 fiber
                flag: Update,
            };
        }
        if (!same && child) {
            // 新增
            newFiber = {
                key: child.key, // 属性的标记节点
                type: child.type,
                props: { ...child.props }, //属性
                stateNode: null,
                child: null,
                sibling: null,
                return: workInProgress,
                flag: Placement,
            };
        }

        if (!same && oldFiber) {
            // 删除
        }
        // 链表继续往后指
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        if (i === 0) {
            //newFiber 是 workInProgress的第一个子fiber
            workInProgress.child = newFiber;
        } else {
            previousNewFiber.sibling = newFiber;
        }

        previousNewFiber = newFiber;
    }
    // console.log('previousNewFiber', previousNewFiber); //log

}


export function useState(init) {
    // 接收初始值，
    /*
    Q：为什么返回是数组？
    A：返回数组相对于定义参数和事件来说比较可控制，若返回单个属性或事件则不够灵活。
    */

    // 更新分初始化和修改后更新
    // 根据 定义alternate  来判断有没有函数的Fible 
    const oldHook = wipFiber.alternate && wipFiber.alternate.hooks[wipFiber.hookIndex]
    const hook = oldHook
        ? { state: oldHook.state, queue: oldHook.queue }
        : {
            state: init,
            queue: []
        }

    // 把state状态添加到queue里，实现批量更新
    // 引起组件整体更新（这里应该是从函数组件开始更新，但是我这里用的是wipRoot从根节点更新）
    const setState = (action) => {
        hook.queue.push(action)
        wipRoot = {
            stateNode: currentRoot.stateNode,
            props: currentRoot.props,
            alternate: currentRoot,
        }
        nextUnitOfWork = wipRoot
    }

    // 模拟批量更新

    hook.queue.forEach((action) => {
        hook.state = action
    })

    wipFiber.hooks.push(hook)
    wipFiber.hookIndex++






    return [hook.state, setState]

}

export default { render }