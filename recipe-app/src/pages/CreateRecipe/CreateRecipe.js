import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Form, Field, FieldArray } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';

const useStyles = makeStyles(() => ({
    wrapper: {
        height: '100vh',
        width: '100vw',
        padding: '20px',
        paddingLeft: '20%',
        paddingRight: '20%',
    },
    button: {
        width: 130,
        marginTop: 50,
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#8839ef',
        color: 'white',
        '&:hover': {
            backgroundColor: '#8839ef',
        },
    },
    buttonErrorText: {
        width: '100%',
        textAlign: 'center', 
        marginTop: 20,
    },
    title: {
        marginBottom: '20px',
    },
    subtitle: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    fieldContainer: {
        width: '100%',
    },
    field: {
        width: '30%',
    },
    addButton: {
        marginTop: '20px',
        backgroundColor: '#8839ef',
        color: 'white',
        '&:hover': {
            backgroundColor: '#8839ef',
        },
    },
    ingredientRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    quantityField: {
        marginBottom: '15px',
        marginLeft: '10px',
        marginRight: '10px',
    },
    selectField: {
        marginTop: '32px', // Adjust this value to align the dropdown menu properly
    },
}));

export default function CreateRecipe() {
    const classes = useStyles();
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        axios.get('/api/ingredient')
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    }, []);

    return (
        <Form className={classes.wrapper}>
            <Typography variant='h3' component='h1' className={classes.title}>
                Create a Recipe
            </Typography>
            <Grid container direction='column' spacing={2} className={classes.fieldContainer}>
                <Grid container item spacing={2} className={classes.field}>
                    <Grid item xs={8}>
                        <Field
                            component={TextField}
                            name='title'
                            label='Name of Recipe'
                            variant='standard'
                            margin='normal'
                            fullWidth />
                    </Grid>
                    <Grid item xs={4} className={classes.selectField}>
                        <Field
                            component={Select}
                            name='cookingTime'
                            label='Cooking Time (minutes)'
                            variant='standard'
                            margin='normal'
                            fullWidth
                            displayEmpty
                        >
                            <MenuItem value="">
                                Cooking Time (minutes)
                            </MenuItem>
                            <MenuItem value={5}>5 minutes</MenuItem>
                            <MenuItem value={10}>10 minutes</MenuItem>
                            <MenuItem value={15}>15 minutes</MenuItem>
                            <MenuItem value={20}>20 minutes</MenuItem>
                            <MenuItem value={30}>30 minutes</MenuItem>
                            <MenuItem value={45}>45 minutes</MenuItem>
                            <MenuItem value={60}>60 minutes</MenuItem>
                            <MenuItem value={90}>90 minutes</MenuItem>
                            <MenuItem value={120}>120 minutes</MenuItem>
                        </Field>
                    </Grid>
                </Grid>
                <Grid item className={classes.field}>
                    <Field
                        component={TextField}
                        name='instructions'
                        label='Instructions'
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        multiline
                        rows={10}
                    />
                    <Field
                        component={TextField}
                        name='notes'
                        label='Extra Notes / garnishes / etc.'
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        multiline
                        rows={4}
                    />
                    <Typography variant='h5' component='h1' className={classes.subtitle}>
                        Add Ingredients
                    </Typography>
                    <FieldArray name="ingredients">
                        {({ push, remove, form }) => (
                            <>
                                {form.values.ingredients.map((ingredient, index) => (
                                    <div className={classes.ingredientRow} key={index}>
                                        <Field
                                            component={Select}
                                            name={`ingredients[${index}].ingredientId`}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>Select Ingredient</MenuItem>
                                            {ingredients.map((ingredient) => (
                                                <MenuItem key={ingredient.id} value={ingredient.id}>
                                                    {ingredient.name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        <Field
                                            component={TextField}
                                            name={`ingredients[${index}].quantity`}
                                            label="Quantity"
                                            className={classes.quantityField}
                                        />
                                        <IconButton onClick={() => remove(index)}>
                                            <RemoveIcon />
                                        </IconButton>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={() => push({ ingredientId: '', quantity: '' })}
                                    className={classes.addButton}
                                >
                                    Add Ingredient
                                </Button>
                            </>
                        )}
                    </FieldArray>
                </Grid>
            </Grid>
        </Form>
    );
}
