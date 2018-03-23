import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Button, Card, Typography, withStyles } from 'material-ui';

import * as actions from './AuthActions';
import * as selectors from './AuthSelectors';

const styles = theme => ({
    container: {
        margin: '0 auto',
        textAlign: 'center',
        width: '700px',
    },
    cardHeading: {
        margin: 8
    },
    fieldLine: {
        padding: 16,
        margin: 8
    },
    buttonLine:{
        padding: 16,
        margin: 16
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        justifyContent: 'center'
    },
    error: {
        color: 'red',
    }
});

class LoginForm extends React.Component {
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
        this.props.loginRequest(this.state.username, this.state.password);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    handleSubmit(e) {
        this.login();
        e.preventDefault();
    }

    validateField(fieldName, value) {
        let fieldValidErrors = this.state.errors;
        let usernameValid = this.state.usernameValid;
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

    validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <Card className={classes.container}>
                <Typography className={classes.fieldLine} variant="headline" component="h2" className={classes.cardHeading}>Вход</Typography>

                <Typography color="error">{this.props.serverErrors}</Typography>

                <div className={classes.fieldLine}>
                    <TextField
                        onChange={(e) => {this.handleChange(e)}}
                        type="text"
                        label="Username"
                        name="username"
                        value={this.state.username}
                        error={!this.state.usernameValid}
                    />
                    <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.username}</Typography>
                </div>

                <div className={classes.fieldLine}>
                    <TextField
                        onChange={(e) => {this.handleChange(e)}}
                        type="password"
                        label="Password"
                        name="password"
                        value={this.state.password}
                        error={!this.state.passwordValid}
                    />
                    <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.password}</Typography>
                </div>

                <Button variant="raised" color="primary" onClick={(e) => {this.handleSubmit(e)}} className={classes.buttonLine} disabled={!this.state.formValid}>
                    Войти
                </Button>

                <Button variant="raised" onClick={() => {
                    this.props.history.push('/register');
                }} className={classes.buttonLine}>
                    Зарегистрироваться
                </Button>


            </Card>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginForm));