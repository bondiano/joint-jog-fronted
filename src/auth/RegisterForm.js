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
        isSending: PropTypes.bool.isRequired,        
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
        const { name, value } = e.target;
        this.setState({[name]: value},
            () => { this.validateField(name, value); });
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
                usernameValid = value.match(/^[a-zA-Z][a-zA-Z0-9-_\.]{5,16}$/i);
                fieldValidErrors.username = usernameValid ? '': 'Неверный формат логина.';
                break;
            case 'password':
                passwordValid = value.match(/[0-9а-яА-Яa-zA-Z!@#$%^&*]{6,24}/i);
                fieldValidErrors.password = passwordValid ? '': 'Неверный формат пароля. Пароль должен содержать латинские буквы и цифры.';
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
                <form onSubmit={this.handleSubmit}>                
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

                    <Button 
                        variant="raised" 
                        color="primary" 
                        type="submit" 
                        className={classes.buttonLine} 
                        disabled={!this.state.formValid || this.props.isSending}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isSending: state.auth.isSending,    
    serverErrors: state.auth.errors
});

const mapDispatchToProps = {
    registerRequest: actions.registerRequest
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(AuthStyles)(RegisterForm)));