# Docreator
基于React和MDX的文档构建工具。

## 特性
* **易于上手**，非常简洁的api设计，仅有数个api，对轻量级应用可做到零配置。
* **组件展示**，桥接MDX使得可在Markdown文件中书写react组件。
* **支持HMR**，本地开发中支持热更新Markdown文件。

## 它是如何工作的？
访问对应的URL，通过fetch获取对应的Mardown文件。

```
/         => /README.md
/foo      => /foo.md
/foo/     => /foo/README.md
/foo/bar  => /foo/bar.md
```

## 快速开始
在工作目录创建`README.md`和`doc.config.js`文件。

```bash
.
├── README.md
└── doc.config.js
```

`README.md`:

```
# hello world!
```

`doc.config.js`:

```javascript
module.exports = {
  siteTitle: 'Docreator',
  footer: false
}
```

在当前目录的`package.json`中配置一个npm脚本然后运行它:

```
"website": docreator dev .
```

不出意外的话，Docreator会自动打开一个网页显示:

![README.md](https://raw.githubusercontent.com/zero1five/docreator/master/website/images/quickstart.png)

## 它的由来
构建React项目时往往需要前端之间互相沟通自己所设计的组件，避免重复工作。
而是否可以通过文档构建工具建立对应的组件可视化文档相对降低沟通成本是一个必然而然的需求，
这个需求会一直伴随着整个项目的生命周期。因此 **Docreator** 诞生了。
