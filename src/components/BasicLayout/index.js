import React, { PureComponent } from 'react'
import { Layout, Menu, Button, Icon } from 'antd'
import { withRouter } from 'react-router-dom'

import SiderBody from '../Sider'

const { Content, Footer, Header, Sider } = Layout

const Border = '1px solid rgb(232, 232, 232)'

@withRouter
export default class App extends PureComponent {
  state = {
    SiderWidth: 256,
    HeaderHeight: 54,
    screenMode: 'computer',
    open: false,
    footerMsg: '© 2019 Made by zero1five',
    ...creatorConfig
  }

  renderSider = () => {
    return (
      <Sider
        collapsedWidth={0}
        collapsed={this.state.collapsed}
        style={{
          paddingTop: this.state.HeaderHeight,
          height: '100vh',
          position: 'fixed',
          left: 0,
          background: 'white',
          borderRight: Border,
          overflow: 'auto'
        }}
        width={this.state.SiderWidth}
      >
        <SiderBody {...this.state} />
      </Sider>
    )
  }

  renderFooter = () => {
    return <p>{this.state.footerMsg}</p>
  }

  render() {
    const { screenMode } = this.state
    console.log(this.props.children)
    return (
      <Layout>
        <Header
          style={{
            padding: 25,
            background: '#fff',
            width: '100%',
            top: 0,
            zIndex: 3,
            position: 'fixed',
            borderBottom: Border,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: this.state.HeaderHeight
          }}
        ></Header>
        {this.renderSider()}
        <Layout
          style={{
            marginTop: this.state.HeaderHeight,
            marginLeft:
              this.props.location.pathname === '/' && screenMode === 'mobile'
                ? 0
                : this.state.SiderWidth
          }}
        >
          <Content
            style={{
              overflow: 'initial',
              display: 'flex',
              justifyContent: 'center',
              background: '#fff'
            }}
          >
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center', background: '#fff' }}>
            {this.renderFooter()}
          </Footer>
        </Layout>
      </Layout>
    )
  }
}