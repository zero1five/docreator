const APIForm = require('./plugins/APIForm')

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
        { title: '插件系统', path: './docs/指南/插件.md' }
      ]
    },
    {
      title: '参考',
      path: './dosc/参考',
      children: [
        { title: '配置项', path: './docs/参考/配置项.md' },
        { title: '插件API', path: './docs/参考/插件API.md' }
      ]
    }
  ],
  plugins: [APIForm]
}
