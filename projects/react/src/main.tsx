import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import MobxStoreProvider from '/@/mobx'
import { Provider } from 'react-redux'
import store from './store'

import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MobxStoreProvider>
        <App />
      </MobxStoreProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
