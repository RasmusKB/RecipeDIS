import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import Signup from './Signup';
import { useHistory } from 'react-router-dom';

const initialValues = {
    username: '',
    password: '',
    email: '',
};

const FormikSignup = () => {
    const history = useHistory();

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);

        axios.post('/api/user/create', {
            username: values.username,
            password: values.password,
            email: values.email,
        })
            .then(() => {
                history.push('/');
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        actions.setStatus('unauthorized');
                    } else if (error.response.status === 400) {
                        actions.setStatus('userExists');
                    } else {
                        actions.setStatus('networkError');
                    }
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    actions.setStatus('networkError');
                } else {
                    console.error('Error', error.message);
                    actions.setStatus('networkError');
                }
            })
            .finally(() => {
                actions.setSubmitting(false);
            });
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {(formikProps) => <Signup {...formikProps} />}
        </Formik>
    );
};

export default FormikSignup;
