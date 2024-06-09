import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Form, Field, FieldArray } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    wrapper: {
        height: '100vh',
        width: '100vw',
        padding: '20px',
        paddingLeft: '5%',
        paddingRight: '5%',
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
    buttonBottom: {
        width: 130,
        marginTop: 50,
        marginBottom: 50,
        marginLeft: '0px',
        marginRight: '50px',
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
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex',
        marginTop: 'auto',
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
        width: '100%',
    },
    addButton: {
        marginTop: '20px',
        backgroundColor: '#4050b5',
        color: 'white',
        '&:hover': {
            backgroundColor: '#4050b5',
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
        marginTop: '32px',
    },
    newIngredientField: {
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    newIngredientInput: {
        marginRight: '0%',
    },
}));

export default function CreateRecipe(props) {
	const history = useHistory();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar()
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        setIsLoggedIn(!!userId);
    }, []);

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = () => {
        axios.get('/api/ingredient')
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    };

    const handleAddNewIngredient = () => {
        if (newIngredient.trim() !== '') {
            axios.post('/api/ingredient', { name: newIngredient })
                .then(response => {
                    setNewIngredient('');
                    fetchIngredients();
                })
                .catch(error => {
					if (error.response && error.response.status === 500) {
						enqueueSnackbar('Ingredient already exists', { variant: 'error' });
					} else {
						enqueueSnackbar('An error occurred. Try again.', { variant: 'error' });
					}
                });
        }
    };

	const handleCancel = () => {
		history.push('/frontpage');
	}

    return (
        <Form className={classes.wrapper}>
            <Typography variant='h3' component='h1' className={classes.title}>
                Create a Recipe
            </Typography>
            <Grid container spacing={6}>
                <Grid item xs={12} md={8}>
                    <Grid container direction='column' spacing={2} className={classes.fieldContainer}>
                        <Grid container item spacing={2} className={classes.field}>
                            <Grid item xs={12} md={8}>
                                <Field
                                    component={TextField}
                                    name='recipeName'
                                    label='Name of Recipe'
                                    variant='standard'
                                    margin='normal'
                                    id='recipeName'
                                    fullWidth />
                            </Grid>
                            <Grid item xs={12} md={4} className={classes.selectField}>
                                <Field
                                    component={Select}
                                    name='cookingTime'
                                    label='Cooking Time (minutes)'
                                    variant='standard'
                                    margin='normal'
                                    id='cookingTime'
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
                                id='instructions'
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
                                            onClick={() => {
                                                if (sessionStorage.getItem('username')) {
                                                    push({ ingredientId: '', quantity: '' });
                                                } else {
                                                    setErrorMessage('You need to be logged in to add an ingredient.');
                                                }
                                            }}
                                            className={classes.addButton}
                                        >
                                            Add Ingredient
                                        </Button>
                                    </>
                                )}
                            </FieldArray>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant='h5' component='h1' className={classes.subtitle}>
                        Add New Ingredient
                    </Typography>
                    <Field
                        component={TextField}
                        name='newIngredient'
                        label='New Ingredient Name'
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                        className={classes.newIngredientInput}
                    />
                    <Button
                        variant="contained"
						style={{ backgroundColor: !isLoggedIn ? '#c0c0c0' : '#4050b5', color:'#ffffff' }}
                        onClick={handleAddNewIngredient}
                        className={classes.addButton}
						disabled={!isLoggedIn}
                    >
						{isLoggedIn ? "Add New Ingredient" : "You are not logged in"}
                    </Button>
                </Grid>
            </Grid>
            {errorMessage && (
                <Typography color="error" className={classes.buttonErrorText}>
                    {errorMessage}
                </Typography>
            )}
            <Grid item xs={4} className={classes.buttonContainer}>
				<Button
					variant='contained'
					style={{ backgroundColor: (props.isSubmitting || !isLoggedIn) ? '#c0c0c0' : '#04a5e5', color:'#ffffff' }}
					className={classes.buttonBottom}
					type='submit'
					disabled={props.isSubmitting || !isLoggedIn}
				>
					{isLoggedIn ? "Create" : "You are not logged in"}
				</Button>
				<Button
					variant='contained'
					style={{ backgroundColor: props.isSubmitting ? '#c0c0c0' : '#e78284', color:'#ffffff' }}
					className={classes.buttonBottom}
					onClick={handleCancel}
				>
					Cancel
				</Button>
			</Grid>
        </Form>
    );
}
