import React, { PureComponent } from 'react'
import MDXRender from '../../components/MDXRender'
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

    return <MDXRender html={html} />
  }
}
