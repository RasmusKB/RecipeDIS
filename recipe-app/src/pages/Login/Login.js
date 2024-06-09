import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    wrapper: {
        height: '100vh',
        width: '100vw'
    },
    button: {
        width: 130,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '50',
        marginRight: 'auto'
    },
    buttonErrorText: {
        width: '100%',
        textAlign: 'center'
    }
}))

export default function LoginPage (props) {
    const classes = useStyles()
    const history = useHistory()

    const getErrorMessage = () => {
        switch (props.status) {
            case 'unauthorized':
                return 'Username/Email/Password was incorrect.';
            case 'networkError':
                return 'A network error occurred, try again.';
            default:
                return '';
        }
    };

	const handleSignUp = () => {
		history.push('/signup');
	};

return (
		<Form>
			<Grid container direction='column' alignItems='center' justifyContent='space-evenly' spacing={2} className={classes.wrapper}>
				<Grid item>
					<Typography variant='h3' component='h1'> DIS project 2024 </Typography>
				</Grid>
				<Grid item>
					<Typography variant='h4' component='h2'> Login </Typography>
				</Grid>
				<Grid item style={{ width: 400 }}>
					<Field
						component={TextField} variant='filled' name='username' label='Username/Email' fullWidth
						margin='normal' id='username' />
					<Field
						component={TextField} variant='filled' name='password' type='password' label='Password'
						fullWidth margin='normal' id='password' />
				</Grid>
				<Grid item>
					<Grid container direction='column' alignItems='center' spacing={1}>
						<Grid item>
							<Button
								variant='contained'
								style={{ backgroundColor: props.isSubmitting ? '#c0c0c0' : '#04a5e5', color:'#ffffff' }}
								className={classes.button}
								type='submit'
								disabled={props.isSubmitting}>
								Login
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant='contained'
								style={{ backgroundColor: props.isSubmitting ? '#c0c0c0' : '#4050b5', color:'#ffffff' }}
								className={classes.button}
								onClick={handleSignUp}
								disabled={props.isSubmitting}>
								Sign up
							</Button>
						</Grid>
					</Grid>
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
