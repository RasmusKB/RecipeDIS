import React from 'react';
import { Formik } from 'formik';
import FrontPage from './FrontPage';

const initialValues = {
    searchQuery: '',
};

const FormikFrontPage = () => {

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);
        // Simulate a search action for now
        console.log("Search submitted with query:", values.searchQuery);
        setTimeout(() => {
            actions.setSubmitting(false);
        }, 1000);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {(formikProps) => <FrontPage {...formikProps} />}
        </Formik>
    );
};

export default FormikFrontPage;
