import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import CssBaseLine from '@mui/material/CssBaseline'


function GlobalProviders ({ children }) {
    return (
        <Router>
            <SnackbarProvider>
                    <ConfigurationProvider>
                        <CssBaseLine />
                        {children}
                    </ConfigurationProvider>
            </SnackbarProvider>
        </Router>
    )
}

GlobalProviders.propTypes = {
    children: PropTypes.node.isRequired
}

function App () {
    const history = useHistory()

    setResponseHandling(response => response.unauthorized(() => history.push('/login')))

    return (
        <Switch>
            <Route path='/'>
            </Route>
        </Switch>
    )
}

const AppWithProviders = () => <GlobalProviders><App /></GlobalProviders>

export default AppWithProviders
