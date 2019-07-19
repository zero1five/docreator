# 在Markdown中使用React
得益于MDX的优秀功能使得可以在 Markdown 文件编写 React。

## 直接编写

# Hello, *world*!

Below is an example of JSX embedded in Markdown. <br /> **Try and change
the background color!**
<div style={{ padding: '20px', backgroundColor: 'tomato' }}>
  <h3>This is JSX in Markdown</h3>
</div>

```.mdx
# Hello, *world*!

Below is an example of JSX embedded in Markdown. <br /> **Try and change
the background color!**

<div style={{ padding: '20px', backgroundColor: 'tomato' }}>
  <h3>This is JSX</h3>
</div>

```

## 导入组件
在文档中显示一个折线图

<Basic />

在工作目录创建一个components文件夹，处于该文件夹下的组件都会自动加载。
在该文件夹下面创建一个组件。

```bash
.
├── components
│ ├── Basic
│   ├── index.js  
│

```

`doc.config.js`
```javascript
module.exports = {
  // ...
  componentPath: './components'
}
```

在Markdown文件中直接使用，用法与react组件相同。
```javascript
// ...
<Basic />
```
