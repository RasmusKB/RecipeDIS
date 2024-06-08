import React from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

import Login from './pages/Login'




function App () {
    const history = useHistory()

    //setResponseHandling(response => response.unauthorized(() => history.push('/login')))

    return (
		<Router>
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route path='/'>
				</Route>
			</Switch>
		</Router>
    )
}

export default App
