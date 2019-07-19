import React, { PureComponent } from 'react'
import MDX from '@mdx-js/runtime'
import config from '../../globalConfig'

const loadComponent = path => {
  const cp = {}
  const { cpNames } = config
  for (let i = 0, l = cpNames.length; i < l; i++) {
    cp[cpNames[i]] = require('/Users/apple/Documents/lab/docreator/website/' +
      path.slice(2) +
      `/${cpNames[i]}`).default
  }
  return cp
}

const components = loadComponent(config.componentPath)

export default class MDXRender extends PureComponent {
  render() {
    const { html } = this.props
    return (
      <MDX
        components={components}
        remarkPlugins={[]}
        rehypePlugins={[]}
        children={html}
      />
    )
  }
}
