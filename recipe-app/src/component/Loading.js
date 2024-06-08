import React from 'react'

import { Grid, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    row: {
        width: '100%',
        height: '100%'
    }
})

const Loading = () => {
    const classes = useStyles()

    return (
        <Grid container justifyContent='center' alignItems='center' className={classes.row}>
            <Grid item>
                <CircularProgress size={80} color='primary' />
            </Grid>
        </Grid>
    )
}

export default Loading
