import React, { PureComponent } from 'react'
import { Menu } from 'antd'
import { Link, Redirect, withRouter } from 'react-router-dom'

import './index.less'

const baseMenuItem = ({ name, path, children }) => {
  if (children && children.length > 0) {
    return (
      <Menu.SubMenu key={path} title={name}>
        {children.map(baseMenuItem)}
      </Menu.SubMenu>
    )
  } else {
    return <Menu.Item key={path}>{name}</Menu.Item>
  }
}

@withRouter
export default class SiderBody extends PureComponent {
  state = {
    openKeys: []
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    )
    if (this.props.navi.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        width={this.state.SiderWidth}
      >
        {this.props.navi.map(baseMenuItem)}
      </Menu>
    )
  }
}
