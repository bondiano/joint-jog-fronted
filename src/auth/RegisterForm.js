import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, TextField, Button, Typography, Card } from 'material-ui';

import * as actions from './AuthActions';
import { AuthStyles } from './AuthStyles';

class RegisterForm extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        registerRequest: PropTypes.func.isRequired,
        serverErrors: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {
                username: '',
                email: '', 
                password: ''
            },
            usernameValid: true,
            emailValid: true,
            passwordValid: true,
            formValid: false
        };
    }

    register() {
        const { username, email, password } = this.state;
        this.props.registerRequest(username, email, password, this.props.history.push);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.register();
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value); });
    }

    toLogin = () => {
        this.props.history.push('/login');
    }

    validateField(fieldName, value) {
        let fieldValidErrors = this.state.errors;
        let usernameValid = this.state.usernameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidErrors.email = emailValid ? '' : 'Неверный формат электронной почты.';
                break;
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

        this.setState({
            validErrors: fieldValidErrors,
            usernameValid: usernameValid,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.usernameValid && this.state.passwordValid});
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.container}>
                    <Typography className={classes.cardHeading} variant="headline" component="h2">Регистрация</Typography>

                    <Typography color="error">{this.props.serverErrors}</Typography>

                    <div className={classes.fieldLine}>
                        <TextField
                            onChange={this.handleChange}
                            type="text"
                            label="Логин"
                            name="username"
                            value={this.state.username}
                            error={!this.state.usernameValid}
                        />
                        <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.username}</Typography>
                    </div>

                    <div className={classes.fieldLine}>
                        <TextField
                            onChange={this.handleChange}
                            type="text"
                            label="Электронная почта"
                            name="email"
                            value={this.state.email}
                            error={!this.state.emailValid}
                        />
                        <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.email}</Typography>
                    </div>

                    <div className={classes.fieldLine}>
                        <TextField
                            onChange={this.handleChange}
                            type="password"
                            label="Пароль"
                            name="password"
                            value={this.state.password}
                            error={!this.state.passwordValid}
                        />
                        <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.password}</Typography>
                    </div>

                    <Button variant="raised" color="primary" onClick={this.handleSubmit} className={classes.buttonLine} disabled={!this.state.formValid}>
                        Зарегистрироваться
                    </Button>

                    <Button variant="raised" color="secondary" onClick={this.toLogin} className={classes.buttonLine}>
                        Войти
                    </Button>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    serverErrors: state.auth.errors
});

const mapDispatchToProps = {
    registerRequest: actions.registerRequest
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(AuthStyles)(RegisterForm)));