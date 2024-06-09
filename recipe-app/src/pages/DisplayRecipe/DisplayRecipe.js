import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function DisplayRecipe () {
    const history = useHistory()

    const [recipe] = useState(history.location.state?.recipeData)
    const [ingredients, setIngredients] = useState(null)
	const [isCreator, setIsCreator] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = sessionStorage.getItem('userId');
            try {
                const response = await axios.get(`/api/user/${userId}`);
                setIsCreator(recipe.createdBy === response.data.username);
				console.log(response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
		console.log(isCreator);
    }, [recipe.createdBy]);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get(`/api/recipeingredient/123`);
                setIngredients(response.data);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };
        fetchIngredients();
    }, [recipe.id]);

    return (
        <div>
            <h1>Recipe Details</h1>
            {recipe ? (
                <div>
                    <h2>{recipe.name}</h2>
                    <p>Created by: {recipe.createdBy}</p>
                    <p>Cooking Time: {recipe.cookingTime} minutes</p>
                    <p>Instructions: {recipe.instruction}</p>
                    <h3>Ingredients</h3>
                </div>
            ) : (
                <p>No recipe data available.</p>
            )}
            {isCreator && (
                <div>
                    <p>You are the creator of this recipe.</p>
                </div>
            )}
        </div>
    );
}


