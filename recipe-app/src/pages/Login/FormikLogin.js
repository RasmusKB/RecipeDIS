import React from 'react';
import { Formik } from 'formik';
import Login from './Login';

const initialValues = {
    username: '',
    password: '',
};

const FormikLoginPage = () => {

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);
		/*
        postJson('USERENDPOINT', {
            email: values.username,
            password: values.password,
        })
            .then((res) => {
                const response = res.data;
                if (response.error) {
                    actions.setStatus('unauthorized');
                    return;
                }
                window.location.href = '/';
            })
            .catch((error) => {
                actions.setStatus('networkError');
                console.error('Login error:', error);
            })
            .finally(() => {
                actions.setSubmitting(false);
            });
		*/
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {(formikProps) => <Login {...formikProps} />}
        </Formik>
    );
};

export default FormikLoginPage;
