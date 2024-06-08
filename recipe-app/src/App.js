import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import FrontPage from './pages/FrontPage'




function App () {
    return (
		<Router>
			<Switch>
				<Route exact path='/' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/frontpage' component={FrontPage} />
			</Switch>
		</Router>
    )
}

export default App
