import React, { PureComponent } from 'react'
import MDX from '@mdx-js/runtime'

const config = require('../../../website/doc.config')

import Basic from '../../../website/components/Basic/index'

export default class MDXRender extends PureComponent {
  render() {
    const { html } = this.props
    const components = {
      Basic: props => <Basic {...props} />
    }

    return (
      <MDX
        components={components}
        remarkPlugins={[...config.plugins]}
        rehypePlugins={[]}
        children={html}
      />
    )
  }
}
