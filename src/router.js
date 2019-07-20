import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './components/BasicLayout'

export default component => {
  return (
    <Router>
      <App>
        <Switch>
          <Route path="/" exact component={component['home']} />
          <Route path="/404" exact component={component['404']} />
          <Route component={component['basePage']} />
        </Switch>
      </App>
    </Router>
  )
}
