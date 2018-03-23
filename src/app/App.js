import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from 'material-ui/CssBaseline';
import { Switch, Route, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { connect } from 'react-redux';

import Navbar from './common/Navbar';
import RegisterForm from '../auth/RegisterForm';
import LoginForm from "../auth/LoginForm";
import EventContainer from '../events/EventsContainer';

import theme from '../theme';

const styles= theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'
    }
});

class App extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <CssBaseline/>
                <MuiThemeProvider theme={theme}>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={EventContainer} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegisterForm} />
                    </Switch>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));
