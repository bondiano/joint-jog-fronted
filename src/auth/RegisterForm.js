import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './AuthActions';
import * as selectors from './AuthSelectors';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            validErrors: {username: '', email: '', password: ''},
            usernameValid: false,
            emailValid: false,
            passwordValid: false,
            formValid: false
        };
    }

    validateField(fieldName, value) {
        let fieldValidErrors = this.state.validErrors;
        let usernameValid = this.state.usernameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidErrors.email = emailValid ? '' : 'Email не корректен.';
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

        this.setState({validErrors: fieldValidErrors,
            usernameValid: usernameValid,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.usernameValid && this.state.passwordValid});
    }

    register() {
        const { username, email, password } = this.state;
        this.props.registerRequest(username, email, password);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.register();
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value},
            () => { this.validateField(e.target.name, e.target.value) });
    }

    render() {
        return (
            <Card className={classes.container}>
                <form action="/" onSubmit={handleSubmit}>
                    <h2 className={classes.cardHeading}>Регистрация</h2>

                    <ErrorsForm errors={errors}/>

                    <div className={classes.fieldLine}>
                        <TextField
                            onChange={handleChange}
                            type="text"
                            label="Username"
                            name="username"
                            value={username}
                        />
                    </div>

                    <div className={classes.fieldLine}>
                        <TextField
                            onChange={handleChange}
                            type="text"
                            label="Email"
                            name="email"
                            value={email}
                        />
                    </div>

                    <div className={classes.fieldLine}>
                        <TextField
                            onChange={handleChange}
                            type="password"
                            label="Password"
                            name="password"
                            value={password}
                        />
                    </div>

                    <div className={classes.buttonLine}>
                        <Button variant="raised" type="submit" label="Зарегистрироваться" primary disabled={!valid}/>
                    </div>

                    <Typography><Link to={'/login'}>Уже есть аккаунт?</Link></Typography>
                </form>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    serverErrors: selectors.selectErrors
});

const mapDispatchToProps = {
    registerRequest: actions.registerRequest
};

RegisterForm.propTypes = {
    registerRequest: PropTypes.func,
    serverErrors: PropTypes.array
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));