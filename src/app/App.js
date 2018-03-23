import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import CssBaseline from 'material-ui/CssBaseline';

import { connect } from 'react-redux';
import Navbar from './common/Navbar';

// import PrivateRoute from './common/PrivateRouter';

import RegisterForm from '../auth/RegisterForm';
import LoginForm from "../auth/LoginForm";
import EventContainer from '../events/EventsContainer';

class App extends React.Component {

    render() {
        return (
            <Fragment>
                <CssBaseline/>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={EventContainer} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
                </Switch>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
