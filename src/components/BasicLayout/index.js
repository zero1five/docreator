import React, { PureComponent, Component } from 'react'
import { Layout, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import config from '../../globalConfig'

import SiderBody from '../Sider'
import HeaderBody from '../Header'

const HeaderWithRouter = withRouter(HeaderBody)
const SiderWithRouter = withRouter(SiderBody)

const { Content, Footer, Header, Sider } = Layout

const Border = '1px solid rgb(232, 232, 232)'

@withRouter
export default class App extends Component {
  state = {
    SiderWidth: 256,
    HeaderHeight: 54,
    screenMode: 'computer',
    open: false,
    footerMsg: '© 2019 made by zero1five',
    ...config
  }

  constructor(props) {
    super(props)
    this.setWindowsTitle(props.location)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setWindowsTitle(nextProps.location)
    }
  }

  setWindowsTitle(location) {
    const { siteTitle } = config
    if (siteTitle !== undefined) {
      if (config.autoSubTitle && location.pathname !== '/') {
        const { pathname } = location
        document.title = `${pathname.slice(1)} | ${config.siteTitle}`
        return
      }

      document.title = siteTitle
    }
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
        <SiderWithRouter {...this.state} />
      </Sider>
    )
  }

  renderFooter = () => {
    return <p>{this.state.footerMsg}</p>
  }

  renderNavBar = () => {
    const { screenMode, open, siteTitle } = this.state
    return (
      <>
        {screenMode === 'mobile' && this.props.location.pathname !== '/' ? (
          <Button type="primary" ghost={true} onClick={this.openshit}>
            <Icon type={open ? 'menu-unfold' : 'menu-fold'} />
          </Button>
        ) : null}
        <div className="logo">
          <Link to={'/'}>{siteTitle}</Link>
        </div>
        {screenMode === 'mobile' ? null : <HeaderWithRouter {...this.state} />}
      </>
    )
  }

  openshit = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { screenMode } = this.state
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
        >
          {this.renderNavBar()}
        </Header>
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
