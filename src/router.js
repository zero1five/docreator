import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './components/BasicLayout'

export default component => {
  return (
    <Router>
      <App>
        <Switch>
          <Route path="/" exact component={component['home']} />
          <Route component={component['basePage']} />
        </Switch>
      </App>
    </Router>
  )
}
