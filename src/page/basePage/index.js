import React, { PureComponent } from 'react'
import { connect } from '../../miniDva'

@connect()
export default class BasePage extends PureComponent {
  render() {
    return <p>BasePage</p>
  }
}
