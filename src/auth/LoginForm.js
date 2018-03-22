import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Button, Card } from 'material-ui';

import history from '../history';

import * as actions from './AuthActions';
import * as selectors from './AuthSelectors';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    login() {
        this.props.loginRequest(this.state.username, this.state.password);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        this.login();
        e.preventDefault();
    }

    render() {
        return (
            <Card>
                <form action="/">
                    <h2>Вход</h2>

                    <div>
                        <TextField
                            onChange={(e) => {this.handleChange(e)}}
                            type="text"
                            label="Username"
                            name="username"
                            value={this.state.username}
                        />
                    </div>

                    <div>
                        <TextField
                            onChange={(e) => {this.handleChange(e)}}
                            type="password"
                            label="Password"
                            name="password"
                            value={this.state.password}
                        />
                    </div>

                    <Button variant="raised" color="primary" onClick={(e) => {this.handleSubmit(e)}}>
                        Войти
                    </Button>

                </form>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    serverErrors: selectors.selectErrors(state)
});

const mapDispatchToProps = {
    loginRequest: actions.loginRequest
};

LoginForm.propTypes = {
    loginRequest: PropTypes.func,
    serverErrors: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);