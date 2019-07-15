import React, { PureComponent } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import config from '../../globalConfig'

import './index.less'

const baseMenuItem = ({ name, path, children }) => {
  if (children && children.length > 0) {
    return (
      <Menu.SubMenu key={name} title={name}>
        {children.map(baseMenuItem)}
      </Menu.SubMenu>
    )
  } else {
    return (
      <Menu.Item key={name}>
        <Link to={name}>{name}</Link>
      </Menu.Item>
    )
  }
}

const searchOpenKeys = (router, name) => {
  let resolved = false
  const resolve = []

  const recursive = (router, pathname) => {
    for (let i = 0, l = router.length; i < l; i++) {
      const { name, children } = router[i]
      if (resolved) return
      if (children) {
        // 如果是文档，将当前路径push进resolve
        resolve.push(name)
        recursive(children, pathname)
      } else if (router.find(x => x.name === pathname)) {
        resolved = true
        break
      } else {
        resolve.pop()
      }
    }
  }

  recursive(router, name)
  return resolve
}

export default class SiderBody extends PureComponent {
  state = {
    openKeys: []
  }

  componentWillMount() {
    const {
      location: { pathname }
    } = this.props
    const { homePage } = config

    if (pathname !== '/' || homePage) {
      this.openHomeKey(this.props.location)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { homePage } = config
    if (nextProps.location.pathname === '/') {
      if (homePage) {
        this.openHomeKey(nextProps.location)
      } else {
        this.setState({ openKeys: [] })
      }
    }
  }

  openHomeKey = location => {
    const { navi } = this.props
    const { pathname } = location

    const openKeys = searchOpenKeys(navi, pathname.slice(1))
    this.setState({ openKeys })
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    )

    if (!this.props.navi.find(x => x.name === latestOpenKey)) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }

  render() {
    const {
      location: { pathname }
    } = this.props

    return (
      <div className="sider-container">
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          selectedKeys={[pathname.slice(1)]}
          onOpenChange={this.onOpenChange}
          width={this.state.SiderWidth}
        >
          {this.props.navi.map(baseMenuItem)}
        </Menu>
      </div>
    )
  }
}
