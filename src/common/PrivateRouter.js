import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
    const {component: Component, routerProps, isAuth, location, ...rest} = props;
    return isAuth ? (<Route {...rest} render={props => (<Component {...routerProps} {...props}/>)}/>)
    : (<Redirect to={{pathname: '/login', state: {from: location}}}/>);
};

PrivateRoute.defaultProps = {
    isAuth: false,
    routerProps: {}
};

PrivateRoute.propTypes = {
    location: PropTypes.object.isRequired,
    component: PropTypes.func.isRequired,
    routerProps: PropTypes.object,
    isAuth: PropTypes.bool
};

export default PrivateRoute;
