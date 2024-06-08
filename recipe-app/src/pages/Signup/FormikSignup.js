import React from 'react';
import { Formik } from 'formik';
import Signup from './Signup';

const initialValues = {
    username: '',
    password: '',
    email: '',
};

const FormikSignupPage = () => {

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {(formikProps) => <Signup {...formikProps} />}
        </Formik>
    );
}

export default FormikSignupPage;
