import React, { PureComponent } from 'react'
import MDX from '@mdx-js/runtime'
import { connect } from '../../miniDva'
import config from '../../globalConfig'

@connect(state => ({ ...state.markdown }))
export default class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.fetchHomePage()
  }

  fetchHomePage() {
    const { dispatch } = this.props
    dispatch({
      type: 'markdown/fetchMarkdown',
      payload: config.homePage
    })
  }

  render() {
    const {
      page: { html }
    } = this.props
    const components = {}
    console.log(this.props.page)
    return <MDX components={components}>{html}</MDX>
  }
}
