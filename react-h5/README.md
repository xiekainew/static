# insurance-fe-h5

> NewBanker frontend webapp(h5) for insurance.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run test
```

some docs:

[React.js](https://facebook.github.io/react/)

[Webpack](http://webpack.github.io/)

[axios](https://github.com/mzabriskie/axios)

[weui](https://weui.io/)

[react-weui](https://weui.github.io/react-weui/docs/#/react-weui/docs/page/0/articles/0)

------

### nginx server里加上一条配置，根路由下的所有请求都location到index.html
```bash
# server root指向build目录
location / {
  try_files $uri /index.html;
}  

```

### 代码提交流程
> 我们采用fork的方式，统一提交pull request

1. 先去公司官方repo(insurance-fe-H5)上fork一份代码到自己名下
2. clone到本地
3. 进入项目根目录，添加公司主库remote，`git remote add nb git@github.com:NewBanker/insurance-fe-H5.git`
4. 项目改动后先commit到本地
5. 然后 `git fetch nb`，将公司主库的最新代码fetch到本地，然后merge到本地 `git merge nb/master`。如果有冲突就解决下冲突。另外这里也可以直接用git pull
6. 执行 `git rm -rf dist`，删除旧的build文件夹，然后 `npm run build`，build新的版本
7. commit新的改动（主要是重新build生成的文件）
8. `git push origin master`，把本地的commit push到自己的repo中
9. 然后在github自己的repo下点击`New pull request`，提交pull request到公司主库
10.审核pull request，通过后合并到主库

```bash
# 总的来说就是下面这些步骤

$ git commit ...

$ git fetch nb

$ git merge nb/master

$ git rm -rf dist # dist目录是build后生成的，存放生成环境的代码

$ git commit ... # commit build后的改动

$ git push origin master # push到自己的repo

# 然后就是提pull request
```
