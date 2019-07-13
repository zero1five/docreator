import React, { PureComponent } from 'react'
import MDX from '@mdx-js/runtime'
import { connect } from '../../miniDva'

@connect(state => ({ ...state.markdown }))
export default class BasePage extends PureComponent {
  componentWillMount() {
    this.fetchMarkdown(this.props.location)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.fetchMarkdown(nextProps.location)
    }
  }

  fetchMarkdown(location) {
    const { dispatch } = this.props
    const { pathname } = location

    dispatch({
      type: 'markdown/fetchMarkdown',
      payload: pathname
    })
  }

  render() {
    const {
      page: { html }
    } = this.props
    const components = {}

    return <MDX components={components}>{html}</MDX>
  }
}
