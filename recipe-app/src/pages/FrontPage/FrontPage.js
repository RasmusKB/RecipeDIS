import React from 'react';
import { Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Grid, Button, Typography, makeStyles, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
    wrapper: {
        padding: '20px',
        paddingLeft: '400px',
        paddingRight: '400px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    searchBar: {
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#81c8be',
        color: 'white',
        '&:hover': {
            backgroundColor: '#a6d189',
        },
        height: '56px',
        marginLeft: '20px', 
    },
    addButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 'auto',
    },
    addbutton: {
        backgroundColor: '#81c8be',
        color: 'white',
        '&:hover': {
            backgroundColor: '#a6d189',
        },
        marginBottom: '50px',
        width: '70px',
        height: '70px',
    },
    recipeList: {
        marginTop: '20px',
        flexGrow: 1,
    },
}));


const FrontPage = ({ isSubmitting, status }) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Typography variant='h3' component='h1'>Recipe List</Typography>
{/*             <Form>
                <div className={classes.searchBar}>
                    <Field
                        component={TextField}
                        variant='filled'
                        name='searchQuery'
                        label='Search Recipes'
                        fullWidth
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        disabled={isSubmitting}
                        className={classes.button}
                    >
                        Search
                    </Button>
                </div>
            </Form> */}
            <div className={classes.recipeList}>
                {/* Render list of recipes here */}
                <Typography>No recipes available</Typography>
            </div>
            <div className={classes.addButtonContainer}>
                <IconButton className={classes.addbutton}>
                    <AddIcon style={{ fontSize: 'rem' }} />
                </IconButton>
            </div>
        </div>
    );
};

export default FrontPage;
