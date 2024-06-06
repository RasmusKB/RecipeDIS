import 'react-app-polyfill/ie11'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

const render = Component => {
    const root = createRoot(document.querySelector('#react-hook'))
    root.render(<Component />)
}

render(App)
