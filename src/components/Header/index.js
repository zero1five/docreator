import React, { PureComponent } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from '../../miniDva'

import './index.less'

const baseMenuItem = ({ title, link }) => {
  return (
    <Menu.Item key={title}>
      {/https?/.test(link) ? (
        <a href={link}>{title}</a>
      ) : (
        <Link to={link}>{title}</Link>
      )}
    </Menu.Item>
  )
}

@connect()
export default class HeaderBody extends PureComponent {
  static defaultProps = {
    mode: 'horizontal'
  }

  handleClick = e => {
    window.scrollTo(0, 0)
  }

  render() {
    const { navbar, mode } = this.props

    let current = navbar.find(
      n => '/' + n.route === this.props.location.pathname
    )
    // todo nested path
    // what we do here is
    // if `current === undefined` it means it probably is a folder
    // so we do a feather check
    if (!current) {
      const split = this.props.location.pathname.substring(1).split('/')
      const father = split[0]
      for (let idx in navbar) {
        const files = navbar[idx]
        if (files.type === 'dir') {
          if (files.route === father) {
            current = files
            break
          }
        }
      }
    }

    const selectkey =
      this.props.location.pathname === '/'
        ? null
        : current
        ? current.route
        : 'readme'

    return (
      <div style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[selectkey]}
          mode={mode}
          style={{
            borderBottom:
              mode === 'horizontal' ? 0 : '1px solid rgb(233, 233, 233)'
          }}
        >
          {navbar.map(baseMenuItem)}
        </Menu>
      </div>
    )
  }
}
