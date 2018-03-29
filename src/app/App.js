import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from 'material-ui/CssBaseline';
import { Switch, Route, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { connect } from 'react-redux';

import Navbar from '../common/Navbar';
import PrivateRouter from '../common/PrivateRouter';
import RegisterForm from '../auth/RegisterForm';
import LoginForm from "../auth/LoginForm";
import EventContainer from '../events/EventsContainer';
import EditorContainer from '../editor/EditorContainer';
import CurrentUserProfile from "../profile/CurrentUserProfile";
import ForeignUserProfile from "../profile/ForeignUserProfile";

import * as authActions from '../auth/AuthActions';

import theme from '../theme';
import {AppStyles} from './AppStyles';

class App extends React.Component {
    static propTypes = {
        isAuth: PropTypes.bool.isRequired,
        currentUserUsername: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired,
        checkJWT: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        let isAuth = false;
        if (window.localStorage.getItem('token')){
            isAuth = true;
            this.props.checkJWT(this.props.history.push);
        } else {
            isAuth = false;
        }
        this.state = {
            isAuth
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isAuth !== this.state.isAuth) {
            this.setState({
                ...this.state,
                isAuth: nextProps.isAuth
            });
        }
    }

    toMap = () => {
        this.props.history.push('/events');
    }

    toLogin = () => {
        this.props.history.push('/login');
    }

    toProfile = () => {
        this.props.history.push(`/profile/${this.props.currentUserUsername}`);
    }
    
    toCreateNewEvent = () => {
        this.props.history.push('/editor/create');
    }

    logout = () => {
        this.props.logout();
    }
    
    render() {
        return (
            <div className={this.props.classes.root}>
                <CssBaseline/>
                <MuiThemeProvider theme={theme}>
                    <Navbar
                        toMap={this.toMap}
                        toLogin={this.toLogin}
                        toProfile={this.toProfile}
                        toCreateNewEvent={this.toCreateNewEvent}
                        logout={this.logout}
                        isAuth={this.props.isAuth}
                        username={this.props.currentUserUsername}
                    />
                    <Switch>
                        <Route exact path="/" component={EventContainer} />
                        <Route path="/events" component={EventContainer} />                   
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegisterForm} />
                        <PrivateRouter path="/editor" isAuth={this.state.isAuth} component={EditorContainer}/>
                        <Route exact path="/profile" component={CurrentUserProfile} />
                        <Route path="/profile/:username" component={ForeignUserProfile} />
                    </Switch>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    currentUserUsername: state.auth.username
});

const mapDispatchToProps = {
    logout: authActions.logout,
    checkJWT: authActions.checkJWTRequest
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(AppStyles)(App)));
