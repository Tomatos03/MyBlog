# Element UI

## 安装

通过包管理器安装 Element UI：

::: code-group

```npm
npm install element-ui --save
```

```pnpm
pnpm add element-ui
```

:::

## 引入

### 完整引入

(使用 create-vue 创建的项目)在 `main.js` 或 `main.ts` 中添加两个导入：

```javascript
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
```

然后在 Vue 中的 App 实例中引入：

```javascript
app.use(ElementPlus);
```
