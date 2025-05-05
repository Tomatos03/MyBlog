# Vue Router

Vue Router 是 Vue.js 官方的路由管理器，用于构建单页应用

## 安装 Vue Router

### 安装

::: code-group

```npm
npm install vue-router@4
```

```pnpm
pnpm add vue-router@4
```

:::

### 基本配置

创建路由实例并配置路由映射：

```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
```

### 在 Vue 中引入

```js
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

### 进阶配置

#### 路由导航守卫

Vue Router 提供了导航守卫功能，允许你在路由跳转过程中进行拦截和处理

##### 前置守卫

```ts
// 前置守卫会在导航确认前被调用
// to: 即将要进入的目标路由对象
// from: 当前导航正要离开的路由对象
router.beforeEach((to, from) => {
    // 可以根据条件判断是否允许导航
    if (相关逻辑) {
        // 不返回或返回 true 表示导航可以继续
        return;
    }

    // 返回一个路由位置对象，重定向到另一个路由
    return {
        name: 'router-name', // 重定向的路由名称
        query: { redirect: to.fullPath }, // 保存原始目标路径
    };
});

export default router;
```

常用的 to 对象属性如下：

| 属性          | 描述                            |
| ------------- | ------------------------------- |
| `to.path`     | 目标路由的路径                  |
| `to.fullPath` | 完整的 URL，包含查询参数和 hash |
| `to.name`     | 命名路由的名称                  |
| `to.params`   | 路由参数对象                    |
| `to.query`    | URL 查询参数对象                |
| `to.hash`     | URL 中的 hash 值                |
| `to.matched`  | 匹配的路由记录数组              |
| `to.meta`     | 路由元信息                      |
