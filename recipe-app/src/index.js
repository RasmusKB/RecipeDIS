import React from 'react'
import { render as domRender } from 'react-dom'
import App from './App.js'

const render = Component => {
    domRender(
        <Component />,
        document.querySelector('#react-hook')
    )
}

render(App)
