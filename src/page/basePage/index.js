import React, { PureComponent } from 'react'
import MDXRender from '../../components/MDXRender'
import { connect } from '../../miniDva'

@connect(state => ({ ...state.markdown }))
export default class BasePage extends PureComponent {
  constructor(props) {
    super(props)
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

    return <MDXRender html={html} />
  }
}
