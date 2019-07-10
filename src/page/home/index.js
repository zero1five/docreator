import React, { PureComponent } from 'react'
import MDX from '@mdx-js/runtime'
import { connect } from '../../miniDva'
import config from '../../globalConfig'

@connect(state => ({ ...state.markdown }))
export default class Home extends PureComponent {
  componentWillMount() {
    this.fetchHomePage()
    this.setWindowsTitle()
  }

  fetchHomePage() {
    const { dispatch } = this.props

    dispatch({
      type: 'markdown/fetchMarkdown',
      payload: config.homePage
    })
  }

  setWindowsTitle() {
    const { siteTitle } = config
    if (siteTitle !== undefined) {
      document.title = siteTitle
    }
  }

  render() {
    const {
      page: { html }
    } = this.props
    const components = {}

    return <MDX components={components}>{html}</MDX>
  }
}
