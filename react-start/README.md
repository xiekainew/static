## 总结

### webpack 配置
1. 在最新版 `webpack` 里默认需要`mode`字段
2. `plugins` 接受一个数组，里面放置各插件的实例
3. 通过配置`resolve`对象里`extensions`来配置省略文件后缀功能
    ```
    resolve: {
        extensions: ['.js', '.jsx', '.json'] // 有顺序差别
    }
    ```
4.  可以在css-loader之后，通过?追加参数，其中固定的参数叫做modules，
    表示为普通css样式表启用模块化

### class 总结
1. **实例属性**: 通过new出来的实例访问到的属性叫做实例属性
2. **静态属性**: 通过构造函数直接访问的属性叫做静态属性

> 注意1：在class的{}区间内，只能写构造器、静态方法和静态属性、实例方法

