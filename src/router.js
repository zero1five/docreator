import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './components/BasicLayout'

export default component => {
  return (
    <Router>
      <App>
        <Route path="/" exact component={component['home']} />
      </App>
    </Router>
  )
}
