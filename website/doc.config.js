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
        { title: '插件系统', path: './docs//指南/plugins.md' }
      ]
    }
  ]
}
