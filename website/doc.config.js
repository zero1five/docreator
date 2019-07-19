module.exports = {
  siteTitle: 'Docreator',
  footer: true,
  opensideMenu: true,
  sideMenu: [
    {
      title: '指南',
      path: './docs/指南',
      children: [
        { title: '介绍', path: './docs/指南/介绍.md' },
        {
          title: '在Markdown中使用React',
          path: './docs/指南/react-in-markdown.md'
        },
        { title: '内置组件', path: './docs/指南/内置组件.md' }
      ]
    },
    {
      title: '参考',
      path: './dosc/参考',
      children: [{ title: '配置项', path: './docs/参考/配置项.md' }]
    }
  ],
  componentPath: './components'
}
