import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app.react'
import {Provider} from 'react-redux'
import configureStore from './stores/configure_store'

document.addEventListener('DOMContentLoaded', function(){

  let store = configureStore()

  ReactDOM.render(
    <Provider store={store}>
       <App />
     </Provider>,
    document.getElementById('app')
  )
})
