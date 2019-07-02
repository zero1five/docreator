import { App } from './dvaConfig'
import router from './router'

App.router(router)

App.onError(e => {
  console.log('Application Error:', e)
})

App.run(document.getElementById('root'), { isDebug: false })

if (module.hot) {
  module.hot.accept()
}
