import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './components/BasicLayout'

export default component => {
  const baseRouteItem = ({ name, path, children }) => {
    path = '/' + name
    if (children && children.length > 0) {
      return (
        <Route path={path} key={name} component={component[name]}>
          {children.map(baseRouteItem)}
        </Route>
      )
    } else {
      return <Route path={path} key={name} component={component[name]} />
    }
  }

  return (
    <Router>
      <App>
        {[
          <Route path="/" key="home" exact component={component['home']} />,
          ...creatorConfig.navi.map(baseRouteItem)
        ]}
      </App>
    </Router>
  )
}
