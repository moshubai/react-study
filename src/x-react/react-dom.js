/*
vnode:
node:
*/
function render(vnode, container) {
    console.log('vnode', vnode); //log

    const node = createNode(vnode)

    container.appendChild(node)
}

function isStringOrNumber(str) {
    return typeof str === 'string' || typeof str === 'number'
}

function createNode(vnode) {

    let node;
    const { type } = vnode
    if (typeof type === 'string') {
        node = updateHostComponent(vnode)
    } else if (isStringOrNumber(vnode)) {
        node = updateTextComponent(vnode)
    } else if (typeof type === 'function') {
        // 再判断是函数组件还是类组件
        node = type.prototype.isReactComponent
            ? updateClassComponent(vnode)
            : updateFunctionComponent(vnode);
    }
    return node
}
// 函数组件
/*
含数组件的typeof 是function

*/ 
function updateFunctionComponent(vnode) {
    const { type, props } = vnode;
    const child = type(props);
    // vnode->node
    const node = createNode(child);
    return node;
}

// 类组件
function updateClassComponent(vnode) {
    const { type, props } = vnode;
    const instance = new type(props);
    const child = instance.render();

    // vnode->node
    const node = createNode(child);
    return node;
}
function updateHostComponent(vnode) {
    const { type, props } = vnode
    const node = document.createElement(type)
    updateNode(node, props);
    reconcileChildren(node, props.children)
    return node
}
function updateTextComponent(vnode) {
    const node = document.createTextNode(vnode + '')
    return node
}
function updateNode(node, nextVal) {
    Object.keys(nextVal)
        .filter((k) => k !== 'children')
        .forEach((k) => {
            node[k] = nextVal[k];
        })
}
function reconcileChildren(parentNode, children) {
    const newChildren = Array.isArray(children) ? children : [children]

    for (let i = 0; i < newChildren.length; i++) {
        let child = newChildren[i]
        render(child, parentNode)
    }

}
export default { render }