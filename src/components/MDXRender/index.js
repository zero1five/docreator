import React, { PureComponent } from 'react'
import MDX from '@mdx-js/runtime'

import config from '../../globalConfig'

const loadComponent = path => {
  const cp = {}
  const { in_cpNames, out_cpNames } = config
  for (let i = 0, l = in_cpNames.length; i < l; i++) {
    cp[in_cpNames[i]] = loadCpWithWabpck(in_cpNames[i])
  }

  for (let i = 0, l = out_cpNames.length; i < l; i++) {
    cp[out_cpNames[i]] = loadCpWithWabpck(path.slice(2), out_cpNames[i])
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
