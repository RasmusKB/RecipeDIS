import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, makeStyles, Grid, } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(() => ({
    wrapper: {
        padding: '20px',
        paddingLeft: '100px',
        paddingRight: '100px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    subtitleContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        fontSize: '1rem',
        color: '#555',
        marginBottom: '20px',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#555',
    },
    instructions: {
        fontSize: '1.2rem',
        marginBottom: '20px',
    },
    ingredients: {
        fontSize: '1.2rem',
        '& li': {
            marginBottom: '5px',
        },
    },
}));

export default function DisplayRecipe() {
    const classes = useStyles();
    const history = useHistory();

    const [recipe] = useState(history.location.state?.recipeData);
    const [ingredients, setIngredients] = useState([]);
    const [isCreator, setIsCreator] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    setIngredients(response.data);
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

    if (!recipe) {
        return <p>No recipe data available.</p>;
    }

    return (
		<div className={classes.wrapper}>
			<Typography className={classes.title}>{recipe.name}</Typography>
			<Grid container className={classes.subtitleContainer}>
				<Grid item xs={6}>
					<Typography variant="body1">Created by: {recipe.createdBy}</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant="body1">Cooking Time: {recipe.cookingTime} minutes</Typography>
				</Grid>
			</Grid>
			<Typography className={classes.instructions}>{recipe.instruction}</Typography>
			<Typography variant="h6">Ingredients</Typography>
			{loading ? (
				<Typography>Loading ingredients...</Typography>
			) : error ? (
				<Typography>Error loading ingredients</Typography>
			) : ingredients.length > 0 ? (
				<ul className={classes.ingredients}>
					{ingredients.map((ingredient, index) => (
						<li key={index}>{ingredient.name}: {ingredient.quantity}</li>
					))}
				</ul>
			) : (
				<Typography>No ingredients available</Typography>
			)}
			{isCreator && (
				<div>
					<Typography>You are the creator of this recipe.</Typography>
				</div>
			)}
		</div>
	);
}
