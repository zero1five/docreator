import React, { PureComponent } from 'react'
import MDX from '@mdx-js/runtime'
import { encode } from '../../utils'
import config from '../../globalConfig'

const createPerfixTag = tags =>
  tags.reduce((acc, Tag) => {
    acc[Tag] = props => (
      <Tag id={encode(props.children)}>
        <a href={`#${props.children}`}>{props.children}</a>
      </Tag>
    )
    return acc
  }, {})

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

const preHeader = createPerfixTag(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

export default class MDXRender extends PureComponent {
  render() {
    const { html } = this.props
    return (
      <MDX
        components={Object.assign(components, preHeader)}
        remarkPlugins={[]}
        rehypePlugins={[]}
        children={html}
      />
    )
  }
}
