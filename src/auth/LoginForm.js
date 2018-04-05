import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Button, Card, Typography, withStyles } from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';

import * as actions from './AuthActions';
import { AuthStyles } from './AuthStyles';

class LoginForm extends React.Component {
    static propTypes = {
        isSending: PropTypes.bool.isRequired,
        loginRequest: PropTypes.func.isRequired,
        serverErrors: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {username: '', password: ''},
            usernameValid: true,
            passwordValid: true,
            formValid: false
        };
    }

    login() {
        this.props.loginRequest(this.state.username, this.state.password, this.props.history.push);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value},
            () => { this.validateField(name, value); });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.login();
    }

    validateField(fieldName, value) {
        let fieldValidErrors = this.state.errors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'username':
                usernameValid = value.match(/^[a-zA-Z][a-zA-Z0-9-_\.]{5,16}$/i);
                fieldValidErrors.username = usernameValid ? '': 'Неверный формат логина.';
                break;
            case 'password':
                passwordValid = value.match(/(?=^.{5,24}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i);
                fieldValidErrors.password = passwordValid ? '': 'Неверный формат пароля. Пароль должен содержать латинские буквы и цифры.';
                break;
            default:
                break;
        }

        this.setState({validErrors: fieldValidErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
    }

    toRegister = () => {
        this.props.history.push('/register');
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.container}>
                    <Typography className={classes.cardHeading} variant="headline" component="h2">
                        Вход
                    </Typography>

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
                            type="password"
                            label="Пароль"
                            name="password"
                            value={this.state.password}
                            error={!this.state.passwordValid}
                        />
                        <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.password}</Typography>
                    </div>

                    <div className={classes.buttonsWrapper}>
                        <div className={classes.wrapper}>
                            <Button 
                                variant="raised"
                                color="primary"
                                type="submit"
                                onClick={this.handleSubmit}
                                className={classes.buttonLine} 
                                disabled={!this.state.formValid || this.props.isSending}
                            >
                                Войти
                            </Button>
                            {this.props.isSending && <CircularProgress size={32} className={classes.fabProgress}/>}
                        </div>
                        <div className={classes.wrapper}>
                            <Button 
                                variant="raised" 
                                color="secondary" 
                                onClick={this.toRegister} 
                                className={classes.buttonLine}
                                disabled={this.props.isSending}
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isSending: state.auth.isSending,
    serverErrors: state.auth.errors
});

const mapDispatchToProps = {
    loginRequest: actions.loginRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(AuthStyles)(LoginForm));