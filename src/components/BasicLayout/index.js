import React, { PureComponent, Component } from 'react'
import { Layout, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Drawer from 'react-motion-drawer'

import { isSSR } from '../../utils'

import config from '../../globalConfig'
import './index.less'
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

  componentWillMount() {
    isSSR(win => {
      if (win.innerWidth <= 769) {
        this.setState({
          screenMode: 'mobile'
        })
      }
      win.addEventListener('resize', this.resize)
    })
  }

  componentWillUnmount() {
    isSSR(win => {
      win.removeEventListener('resize', this.resize)
    })
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

  resize = () => {
    isSSR(win => {
      if (win.innerWidth <= 769) {
        this.setState({
          screenMode: 'mobile',
          collapsed: true,
          SiderWidth: 0,
          collapsedButtonShow: true
        })
      } else {
        this.setState({
          screenMode: 'computer',
          collapsed: false,
          SiderWidth: 320,
          collapsedButtonShow: false
        })
      }
    })
  }

  collapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      SiderWidth: this.state.collapsed ? 200 : 0
    })
  }
  siderClose = () => {
    this.setState({
      collapsed: true,
      SiderWidth: 0
    })
  }

  renderSider = () => {
    const { navi } = this.state
    if (navi.length === 0) {
      return null
    }

    if (this.state.screenMode === 'mobile') {
      return (
        <Drawer
          open={this.state.open}
          onChange={this.closeDrawer}
          drawerStyle={{ background: 'white' }}
          width={200}
        >
          <HeaderWithRouter {...this.state} mode="inline" />
          <SiderWithRouter {...this.state} />
        </Drawer>
      )
    }

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
        {<SiderWithRouter {...this.state} />}
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
        {screenMode === 'mobile' ? (
          <Button type="primary" onClick={this.openshit}>
            <Icon type={open ? 'menu-unfold' : 'menu-fold'} />
          </Button>
        ) : null}
        <div className="logo">
          <Link
            to={'/'}
            className="site-title"
            onClick={() => window.scrollTo(0, 0)}
          >
            {siteTitle}
          </Link>
        </div>
        {screenMode === 'mobile' ? null : <HeaderWithRouter {...this.state} />}
      </>
    )
  }

  openshit = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { screenMode, navi, footer } = this.state
    return (
      <div className="basic-container">
        <Layout>
          <Header
            style={{
              padding: '25px 15px 25px 25px',
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
              display: 'block',
              background: '#fff',
              padding: '1.5rem 0',
              marginTop: this.state.HeaderHeight,
              marginLeft:
                screenMode === 'mobile' || navi.length === 0
                  ? 0
                  : this.state.SiderWidth
            }}
          >
            <Content
              style={{
                maxWidth: 770,
                margin: '0 auto 20px',
                padding: '0 2.5rem',
                background: '#fff'
              }}
              className="page-content"
            >
              {this.props.children}
            </Content>
            {footer && (
              <Footer className="footer">{this.renderFooter()}</Footer>
            )}
          </Layout>
        </Layout>
      </div>
    )
  }
}
