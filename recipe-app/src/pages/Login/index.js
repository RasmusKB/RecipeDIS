import React from 'react'
import LazyLoad from '../../component/LazyLoad'

export default (props) => <LazyLoad component={import('./FormikLogin.js')} {...props} />
