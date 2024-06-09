import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import FrontPage from './pages/FrontPage'
import CreateRecipe from './pages/CreateRecipe'
import DisplayRecipe from './pages/DisplayRecipe'
import { SnackbarProvider } from 'notistack'

function App () {
    return (
		<SnackbarProvider>
			<Router>
				<Switch>
					<Route exact path='/' component={Login} />
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/frontpage' component={FrontPage} />
					<Route exact path='/recipe/create' component={CreateRecipe} />
					<Route exact path='/recipe/:id' component={DisplayRecipe} />
				</Switch>
			</Router>
		</SnackbarProvider>
    )
}

export default App
