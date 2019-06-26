import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './app'
import './index.less'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
