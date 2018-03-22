import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './AuthActions';
import * as selectors from './AuthSelectors';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validErrors: {},
            username: '',
            password: ''
        };
    }

    validateField(fieldName, value) {
        let fieldValidErrors = this.state.validErrors;
        let usernameValid = this.state.usernameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'username':
                usernameValid = (value.length >= 4) && (value.length <= 16);
                fieldValidErrors.username = usernameValid ? '': 'Никнейм должен быть больше 4 и меньше 16 символов.';
                break;
            case 'password':
                passwordValid = (value.length >= 6) && (value.length <= 24);
                fieldValidErrors.password = passwordValid ? '': 'Пароль должен быть больше 6 и меньше 24 символов.';
                break;
            default:
                break;
        }

        this.setState({validErrors: fieldValidErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    login() {
        const { username, password } = this.state;
        this.props.loginRequest(username, password);
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
            <Card className={this.props.classes.container}>
                <form action="/" onSubmit={handleSubmit}>
                    <h2 className={this.props.classes.cardHeading}>Вход</h2>

                    <div className={this.props.classes.fieldLine}>
                        <TextField
                            onChange={handleChange}
                            type="text"
                            label="Username"
                            name="username"
                            value={username}
                        />
                    </div>

                    <div className={this.props.classes.fieldLine}>
                        <TextField
                            onChange={handleChange}
                            type="password"
                            label="Password"
                            name="password"
                            value={password}
                        />
                    </div>

                    <div className={this.props.classes.buttonLine}>
                        <Button variant="raised" type="submit" label="Войти" primary/>
                    </div>

                    <Typography><Link to={'/'}>Нет аккаунта?</Link></Typography>
                </form>
            </Card>
        );
    }

}

const mapStateToProps = state => ({
    serverErrors: selectors.selectErrors
});

const mapDispatchToProps = {
    loginRequest: actions.loginRequest
};

LoginForm.propTypes = {
    loginRequest: PropTypes.func,
    serverErrors: PropTypes.array,
    classes: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);