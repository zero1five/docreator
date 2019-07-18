import React, { PureComponent } from 'react'
import MDX from '@mdx-js/runtime'
import config from '../../globalConfig'
import Basic from '../../../website/components/Basic/index'

import visit from 'unist-util-visit'

export default class MDXRender extends PureComponent {
  render() {
    const { html } = this.props
    const components = {
      Basic: props => <Basic {...props} />
    }

    return (
      <MDX
        components={components}
        remarkPlugins={config.plugins.map(eval)}
        rehypePlugins={[]}
        children={html}
      />
    )
  }
}
