import React, { PureComponent } from 'react'
import MDX from '@mdx-js/runtime'
import slug from 'rehype-slug'
import link from 'rehype-autolink-headings'

import config from '../../globalConfig'

const loadComponent = path => {
  const cp = {}
  const { in_cpNames, out_cpNames } = config
  const assignCpNames = (source, target, prefix) => {
    for (let i = 0, l = source.length; i < l; i++) {
      const curr = source[i]
      if (prefix) {
        target[curr] = loadCpWithWabpck(path.slice(2), curr)
      } else {
        target[curr] = loadCpWithWabpck(curr)
      }
    }
  }

  assignCpNames(in_cpNames, cp)
  assignCpNames(out_cpNames, cp, path.slice(2))

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
        rehypePlugins={[slug, [link, { behavior: 'wrap' }]]}
        children={html}
      />
    )
  }
}
