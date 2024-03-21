# 更新日志

## W1

### 0219

- 在`router/index.js`中添加前缀”  

  ```javascript
  const createRouter = () =>
    new Router({
      base: '/Blockchain-Carbon-Trading-System---EnterpriseFrontEnd/', 
      // 静态资源前缀
      mode: 'history',
      routes: constantRouterMap
    })
  ```


### 0220

- 完成登录页面11