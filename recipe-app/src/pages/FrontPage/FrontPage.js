import React, { useEffect, useState } from 'react';
import { Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Grid, Button, Typography, makeStyles, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'

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
        backgroundColor: '#04a5e5',
        color: 'white',
        '&:hover': {
            backgroundColor: '#04a5e5',
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
	recipeItem: {
        backgroundColor: '#acb0be',
        width: 450,
		marginBottom: '25px',
		marginLeft: '10px'
	}
}));


const FrontPage = ({ isSubmitting, status }) => {
    const classes = useStyles();
    const history = useHistory();

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('/api/recipe');
                setRecipes(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleAddClick = () => {
        history.push(`/recipe/create`);
    };

    const handleClick = (recipeData) => {
        history.push({
			pathname: `/recipe/${recipeData.id}`,
			state: {recipeData}
		});

    };



    return (
        <div className={classes.wrapper}>
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
            <Grid container className={classes.header}>
                <Grid item xs={10}>
                    <Typography variant='h3' component='h1'>Recipes</Typography>
                </Grid>
                <Grid item xs={2} className={classes.addButtonContainer}>
					<Button
						variant='contained'
						className={classes.button}
						onClick={handleAddClick}>
						Create new recipe
					</Button>
                </Grid>
            </Grid>
            <div className={classes.recipeList}>
                {loading && <Typography>Loading...</Typography>}
                {error && <Typography>Error loading recipes</Typography>}
                {!loading && !error && recipes.length === 0 && (
                    <Typography>No recipes available</Typography>
                )}
                {!loading && !error && recipes.length > 0 && (
                    recipes.map(recipe => (
                        <Button
                            key={recipe.id}
                            className={classes.recipeItem}
							onClick={() => handleClick(recipe)}>
                            <div className={classes.nothing}>
                                <Typography variant='h6'>{recipe.name}</Typography>
                                <Typography>Created by: {recipe.createdBy}</Typography>
                                <Typography>Cooking Time: {recipe.cookingTime} minutes</Typography>
                            </div>
                        </Button>
                    ))
                )}
            </div>
        </div>
    );
};

export default FrontPage;
