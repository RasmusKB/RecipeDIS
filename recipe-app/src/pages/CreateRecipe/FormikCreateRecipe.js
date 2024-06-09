import React from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import CreateRecipe from './CreateRecipe';
import axios from 'axios';

const initialValues = {
    recipeName: '',
    instructions: '',
    cookingTime: '',
    ingredients: [{ ingredientId: '', quantity: '' }], 
};

const FormikCreateRecipe = () => {
    const history = useHistory();

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);

        axios.post('/api/recipe', {
            recipeName: values.recipeName,
            instructions: values.instructions,
            cookingTime: values.cookingTime,
            ingredients: values.ingredients,
        })
            .then(() => {
                history.push('/createrecipe');
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
