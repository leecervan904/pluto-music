import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ConfigProvider } from 'antd'

import MobxStoreProvider from '/@/mobx'
import { Provider } from 'react-redux'
import store from './store'

import 'antd/dist/antd.css'
import '/@/design/index.less'

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <Provider store={store}>
        <MobxStoreProvider>
          <App />
        </MobxStoreProvider>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
