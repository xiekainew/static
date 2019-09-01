## react更新数组方法,使用es6语法规则展开符`...`

1. 添加数组
    ```
    this.setState({
        list: [...this.state.list, newValue]
    })
    ```
2. 删除数组数据
    ```
    let list = [...this.state.list]
    list.splice(index, 1)
    this.setState({
        list: list
    })
    ```

## `input`输入框进行双向数据绑定
```
constructor(){
    super()
    this.state({
        inputValue: ''
    })
}
handleChange(e) {
    this.setState({
        inputValue: e.target.value
    })
}
render() {
    return(
        <input
            value={this.state.inputValue}
            onChage={this.handleChange.bind(this)}
        />
    )
}
```

## 子父组件通信
- 父组件通过`props`向子组件传递数据
- 父组件通过`props`向子组件传递方法，注意this的绑定问题
- 父组件通过获取子组件实例，获取子组件的数据或方法

## 性能优化
- 在 `constructor` 内进行this的绑定会节约性能 `this.getValue = this.getValue.bind(this)`


## `this.setState` 函数式写法
```
this.setState((prevState) => ({
    list: [...prevState.list, prevState.newValue]
}))

this.setState((prevState) => {
    const list = [...prevState.list]
    list.splice(index, 1)
    return {
        list
    }
})
```
**可以接收第二个参数，一个回调函数**
```
this.setState((prevState) => ({
    list: [...prevState.list, prevState.newValue]
}), () => {
    console.log('在数据异步更新完之后执行')
})
```



## 概念性定义
- 声明式开发
- 可以与其他框架并存
- 组件化
- 单向数据流
- 视图层框架 
- 函数式编程: 维护起来容易

## 组件更新
- 当组件的state或者props发生改变的时候，render函数就会重新执行（无论state\props有没有在render内被调用）
- shouldComponentUpdate 接收props,state


## diff 算法
- 同层比对


## 生命周期函数
- comonentWillMount 在组件即将被挂载到页面的时刻自动执行


## CSSTransition 用法
```
<CSSTransition
    in={show}
    appear={true}
    timeout={1000}
    classNames="fade"
    unmountOnExit
    onEntered={(el) => {
        el.style.color = 'blue'
    }}
>
    <div>react动画</div>
</CSSTransition>

.fade-enter, .fade-appear{
    opacity: 0;
}

.fade-enter-active, .fade-appear-active{
    opacity: 1;
    transition: opacity 1s ease-in;
}
.fade-enter-done{
    opacity: 1;
}
.fade-exit{
    opacity: 1;
}
.fade-exit-active{
    opacity: 0;
    transition: opacity 1s ease-in;
}
.fade-exit-done{
    opacity: 0;
}

```

## TransitionGroup 的用法
```
<TransitionGroup>
{
    list.map((item, index) => (
        <CSSTransition
            appear={true}
            timeout={1000}
            classNames="fade"
            unmountOnExit
            key={item + index}
        >
            <div>{item}</div>
        </CSSTransition>
    ))
}
</TransitionGroup>
```