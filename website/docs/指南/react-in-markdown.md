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

```javascript
// ...
<Basic />
```
