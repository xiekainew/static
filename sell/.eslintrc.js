// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'semi': ['error', 'always'],    // 必须加分号  去掉的话 为 不能加分号
        'indent': 0,                     //允许缩进4个空格
        'space-before-function-paren':0,
        'no-mixed-spaces-and-tabs':0,
        'no-tabs':0
    },
    'globals': {
        "Swiper": true
    }   //这个地方是新加入的   全局注入
}
