import React from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import CreateRecipe from './CreateRecipe';
import axios from 'axios';

const initialValues = {
    recipeName: '',
    createdBy: sessionStorage.getItem('username'),
    instructions: '',
    notes: '',
    cookingTime: '',
    ingredients: [{ recipeId: '', ingredientId: '', quantity: '' }],
};

const FormikCreateRecipe = () => {
    const history = useHistory();

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);

        // Combine instructions and notes
        const combinedInstructions = `${values.instructions}\n\nNotes / Garnishes / Etc:\n${values.notes}`;

        axios.post('/api/recipe', {
            id: '',
            name: values.recipeName,
            createdBy: values.createdBy,
            instruction: combinedInstructions,
            cookingTime: values.cookingTime
        })
            .then((res) => {
                const updatedIngredients = values.ingredients.map(ingredient => ({
                    ...ingredient,
                    recipeId: res.data.id
                }));

                return axios.post('/api/recipeingredient', updatedIngredients);
            })
            .then(() => {
                history.push('/frontpage');
            })
            .catch(error => {
                console.error('Error creating recipe:', error);
                actions.setStatus('networkError');
            })
            .finally(() => {
                actions.setSubmitting(false);
            });
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {(formikProps) => <CreateRecipe {...formikProps} />}
        </Formik>
    );
};

export default FormikCreateRecipe;
