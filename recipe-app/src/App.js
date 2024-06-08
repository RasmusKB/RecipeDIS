import React from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import FrontPage from './pages/FrontPage'




function App () {
    const history = useHistory()

    //setResponseHandling(response => response.unauthorized(() => history.push('/login')))

    return (
		<Router>
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/frontpage' component={FrontPage} />
				<Route path='/'>
				</Route>
			</Switch>
		</Router>
    )
}

export default App
