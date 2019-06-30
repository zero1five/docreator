import { App } from './dvaConfig'
import router from './router'
import { initStore } from './store'

initStore({ ...creatorConfig })

App.router(router)

App.onError(e => {
  console.log('Application Error:', e)
})

App.run(document.getElementById('root'), true)

if (module.hot) {
  module.hot.accept()
}
