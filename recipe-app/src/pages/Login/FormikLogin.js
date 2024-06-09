import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import Login from './Login';
import { useHistory } from 'react-router-dom';

const initialValues = {
    username: '',
    password: '',
};

const FormikLogin = () => {
	const history = useHistory()

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);

        axios.post('/api/user/login', {
            username: values.username,
            password: values.password,
        })
            .then((res) => {
				sessionStorage.setItem('userId', res.data.id);
				history.push('/frontpage')
            })
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 401) {
						actions.setStatus('unauthorized');
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
            {(formikProps) => <Login {...formikProps} />}
        </Formik>
    );
};

export default FormikLogin;
