import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
    const {component: Component, routerProps, isAuth, ...rest} = props;
    if (isAuth) {
        return (<Route {...rest} render={props => (
            <Component {...routerProps} {...props} />)}/>);
    } else {
        return (<Redirect
            to={{
                pathname: '/login',
                state: {from: props.location}
            }}
        />);
    }
};

PrivateRoute.defaultProps = {
    isAuth: false,
    routerProps: {}
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    routerProps: PropTypes.object,
    isAuth: PropTypes.bool
};

export default PrivateRoute;
