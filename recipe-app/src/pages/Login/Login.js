import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

const useStyles = makeStyles(() => ({
    wrapper: {
        height: '100vh',
        width: '100vw'
    },
    button: {
        width: 130,
        marginTop: 50,
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttonErrorText: {
        width: '100%',
        textAlign: 'center'
    }
}))

export default function LoginPage (props) {
    const classes = useStyles()

    const getErrorMessage = () => {
        switch (props.status) {
            case 'unauthorized':
                return 'Forkert brugernavn/password. Prøv igen';
            case 'networkError':
                return 'Netværksfejl. Prøv igen senere eller kontakt support.';
            default:
                return '';
        }
    };

    return (
        <Form>
            <Grid container direction='column' alignItems='center' justifyContent='space-evenly' spacing={2} className={classes.wrapper}>
                <Grid item>
                    <Typography variant='h3' component='h1'> DIS project 2024 </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h4' component='h2'> Log in </Typography>
                </Grid>
                <Grid item style={{ width: 400 }}>
                    <Field
                        component={TextField} variant='filled' name='username' label='Username' fullWidth
                        margin='normal' id='username' />
                    <Field
                        component={TextField} variant='filled' name='password' type='password' label='Password'
                        fullWidth margin='normal' id='password' />
                </Grid>
                <Grid item>
                    <Button variant='contained' color='primary' className={classes.button} type='submit' disabled={props.isSubmitting}>
                        Log ind
                    </Button>
                </Grid>

                <Grid item>
                    {props.status && (
                        <Typography color='error'>{getErrorMessage()}</Typography>
                    )}
                </Grid>
            </Grid>
        </Form>
    )
}
