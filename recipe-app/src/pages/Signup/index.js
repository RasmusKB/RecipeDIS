import React from 'react';
import LazyLoad from '../../component/LazyLoad.js';

export default (props) => <LazyLoad component={import('./FormikSignup.js')} {...props} />;
