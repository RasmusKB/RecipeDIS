import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, makeStyles, Grid, IconButton, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const useStyles = makeStyles(() => ({
    wrapper: {
        height: '100vh',
        width: '100vw',
        padding: '20px',
		paddingLeft: 50,
		paddingTop: 10
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
    backButton: {
    },
    title: {
        marginBottom: '20px',
    },
    subtitle: {
		fontSize: '1rem'
    },
    editButton: {
        marginLeft: '10px',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-25%)',
    },
    deleteButton: {
        position: 'absolute',
        right: '20px',
        top: '20px',
    },
}));
export default function DisplayRecipe() {
    const classes = useStyles();
    const history = useHistory();

    const [recipe, setRecipe] = useState(history.location.state?.recipeData);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [isCreator, setIsCreator] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(recipe?.name || '');

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = sessionStorage.getItem('userId');
            try {
                const response = await axios.get(`/api/user/${userId}`);
                setIsCreator(recipe && recipe.createdBy === response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [recipe]);

    useEffect(() => {
        const fetchIngredients = async () => {
            if (recipe) {
                try {
                    const response = await axios.get(`/api/recipeingredient/${recipe.id}`);
                    setRecipeIngredients(response.data);

                    const ingredientDetailsPromises = response.data.map(ingredient =>
                        axios.get(`/api/ingredient/${ingredient.ingredientId}`)
                    );

                    const ingredientResponses = await Promise.all(ingredientDetailsPromises);
                    const ingredient = ingredientResponses.map(res => res.data);

                    setIngredients(ingredient);
                } catch (error) {
                    console.error('Error fetching ingredients:', error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchIngredients();
    }, [recipe]);

	const handleBack = () => {
		history.push('/frontpage');
	}

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmDelete) {
            try {
                await axios.delete(`/api/recipeingredient/${recipe.id}`);
                await axios.delete(`/api/recipe/${recipe.id}`);
                history.push('/frontpage');
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await axios.put(`/api/recipe/name`, { ...recipe, name: newName });
            setRecipe({ ...recipe, name: newName });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (!recipe) {
        return <Typography variant='h3' component='h1' className={classes.title}>
					Recipe not available
				</Typography>
    }

    return (
        <Grid container className={classes.wrapper}>
            <Grid item xs={12}>
                <IconButton className={classes.backButton} onClick={handleBack}>
                    <ArrowBackIcon />
                </IconButton>
                {isCreator && (
                    <IconButton
                        className={classes.deleteButton}
						onClick={handleDelete}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
                <Grid container alignItems="center">
                    {isEditing ? (
                        <>
                            <TextField
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                variant="outlined"
                                size="small"
                                className={classes.title}
                            />
                            <IconButton
                                className={classes.editButton}
                                onClick={handleSave}
                            >
                                <CheckIcon />
                            </IconButton>
                            <IconButton
                                className={classes.editButton}
                                onClick={handleCancel}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Typography variant='h3' component='h1' className={classes.title}>
                                {recipe.name}
                            </Typography>
                            {isCreator && (
                                <IconButton
                                    className={classes.editButton}
                                    onClick={handleEdit}
                                >
                                    <EditIcon />
                                </IconButton>
                            )}
                        </>
                    )}
                </Grid>
				<Grid container spacing={2}>
                    <Grid item>
                        <Typography variant='h6' component='p' className={classes.subtitle}>
                            Created by: {recipe.createdBy}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6' component='p' className={classes.subtitle}>
                            Cooking time: {recipe.cookingTime} minutes
                        </Typography>
                    </Grid>
                </Grid>
				<Typography variant='h6' component='p' className={classes.subtitle}>
					Instructions:
				</Typography>
                    <TextField
                        value={recipe.instruction}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={15}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
				<Typography variant='h6' component='p' className={classes.subtitle}>
					Ingredients:
				</Typography>
                {loading ? (
                    <Typography>Loading ingredients...</Typography>
                ) : error ? (
                    <Typography>Error loading ingredients</Typography>
                ) : recipeIngredients.length > 0 ? (
                    <List className={classes.subtitle}>
                        {recipeIngredients.map((recipeIngredient, index) => {
                            const ingredientDetail = ingredients.find(ingredient => ingredient.id === recipeIngredient.ingredientId);
                            return (
                                <ListItem key={index}>
                                    <ListItemText primary={`${ingredientDetail ? ingredientDetail.name : 'Unknown Ingredient'}: ${recipeIngredient.quantity}`} />
                                </ListItem>
                            );
                        })}
                    </List>
                ) : (
                    <Typography>No ingredients available</Typography>
                )}
            </Grid>
        </Grid>
    );
}
