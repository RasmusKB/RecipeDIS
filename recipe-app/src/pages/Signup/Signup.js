import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

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
        marginRight: 'auto',
        backgroundColor: '#4050b5',
        color: 'white',
        '&:hover': {
            backgroundColor: '#4050b5',
        },
    },
    buttonErrorText: {
        width: '100%',
        textAlign: 'center', 
        marginTop: 20,
    }
}));

const getErrorMessage = (status) => {
    switch (status) {
        case 'unauthorized':
            return 'Invalid username/password. Try again';
        case 'userExists':
            return 'User already exists or email is invalid. Please try another username or email.';
        case 'networkError':
            return 'Network error. Try again later.';
        default:
            return '';
    }
};

export default function Signup(props) {
    const classes = useStyles();

    return (
        <Form>
            <Grid container direction='column' alignItems='center' justifyContent='space-evenly' spacing={2} className={classes.wrapper}>
                <Grid item>
                    <Typography
                        variant='h3'
                        component='h1'> DIS project 2024 </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant='h4'
                        component='h2'> Sign Up </Typography>
                </Grid>
                <Grid item style={{ width: 400 }}>
                    <Field
                        component={TextField}
                        variant='filled'
                        name='username'
                        label='Username'
                        fullWidth
                        margin='normal'
                        id='username' />
                    <Field
                        component={TextField}
                        variant='filled'
                        name='email'
                        label='Email'
                        fullWidth
                        margin='normal'
                        id='email'
                        validate={() => {}} />
                    <Field
                        component={TextField}
                        variant='filled'
                        name='password'
                        type='password'
                        label='Password'
                        fullWidth margin='normal'
                        id='password' />
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        className={classes.button}
                        type='submit'
                        disabled={props.isSubmitting}>
                        Sign Up
                    </Button>
                </Grid>
                <Grid item>
                    {props.status && (
                        <Typography color='error' className={classes.buttonErrorText}>
                            {getErrorMessage(props.status)}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Form>
    );
}
