import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper, withStyles, TextField, Button, InputLabel, Select, MenuItem, FormControl, FormLabel, FormControlLabel, FormHelperText } from 'material-ui';
import Radio, { RadioGroup } from 'material-ui/Radio';

import * as profileActions from './ProfileActions';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        alignItems: 'center',
        minWidth: 700,
    },
    cardHeading: {
        margin: 8
    },
    fieldLine: {
        margin: 8
    },

});

const USERNAME_VALID_ERROR = 'Логин должен быть больше 4 и меньше 16 символов.';
const EMAIL_VALID_ERROR = 'Неверный формат электронной почты.';
const AGE_VALID_ERROR = 'Это поле должно содержать только цифры. Вы должны быть старше 11.';

/*TODO
переделать, чтобы через стор, а не через стэйт. когда останется время
 */


class ProfileEditorForm extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        profileUpdate: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        changeFormType: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            socialNetworks: '',
            firstName: '',
            lastName: '',
            age: '',
            sex: '',
            isValid: {
                username: true,
                email: true,
                age: true
            },
            iValidForm: true,
            isEditorForm: false
        };
    }

    componentWillMount() {
        this.setState({
            username: this.props.data.username,
            socialNetworks: this.props.data.socialNetworks,
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
            age: this.props.data.age,
            sex: this.props.data.sex,
        });
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value); });
    };

    handleChangeSocial = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState((prevState, props) => {
           return {socialNetworks: prevState.socialNetworks.push({type: name, url: value})};
        });
    };

    updateData = () => {
        this.props.profileUpdate({
            username: this.state.username,
            socialNetworks: this.state.socialNetworks,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            sex: this.state.sex,
        });
        this.props.changeFormType();

    };

    validateField(fieldName, value) {
        let usernameValid = this.state.isValid.username;
        let emailValid = this.state.isValid.email;
        let ageValid = this.state.isValid.age;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                break;
            case 'username':
                usernameValid = (value.length >= 4) && (value.length <= 16);
                break;
            case 'age':
                ageValid = +value > 11;
                break;
            default:
                break;
        }

        this.setState({isValid: {
                username: usernameValid,
                email: emailValid,
                age: ageValid
            }}, this.validateForm);
    }

    validateForm() {
        this.setState({iValidForm: this.state.isValid.username && this.state.isValid.email && this.state.isValid.age});
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper  className={classes.root}>
                <Typography className={classes.heading} variant="headline" component="h2">Профиль</Typography>

                <div className={classes.fieldLine}>
                    <TextField
                        onChange={this.handleChange}
                        type="text"
                        label="Логин"
                        name="username"
                        value={this.state.username}
                        error={!this.state.isValid.username}
                    />
                    <Typography variant="caption" color="error">{!this.state.isValid.username && USERNAME_VALID_ERROR}</Typography>
                </div>
                <div className={classes.fieldLine}>
                    <TextField
                        onChange={this.handleChange}
                        type="text"
                        label="Электронная почта"
                        name="email"
                        value={this.state.email}
                        error={!this.state.isValid.email}
                    />
                    <Typography variant="caption" color="error">{!this.state.isValid.email && EMAIL_VALID_ERROR}</Typography>
                </div>
                <div className={classes.fieldLine}>
                    <TextField
                        onChange={this.handleChange}
                        type="text"
                        label="Имя"
                        name="firstName"
                        value={this.state.firstName}
                    />
                </div>
                <div className={classes.fieldLine}>
                    <TextField
                        onChange={this.handleChange}
                        type="text"
                        label="Фамилия"
                        name="lastName"
                        value={this.state.lastName}
                    />
                </div>
                <div className={classes.fieldLine}>
                    <TextField
                        onChange={this.handleChange}
                        type="text"
                        label="Возраст"
                        name="age"
                        value={this.state.age}
                        error={!this.state.isValid.age}
                    />
                    <Typography variant="caption" color="error">{!this.state.isValid.age && AGE_VALID_ERROR}</Typography>
                </div>


                <FormControl className={classes.fieldLine}>
                    <FormLabel component="legend">Пол</FormLabel>
                    <RadioGroup
                        name="sex"
                        value={this.state.sex}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Женский" />
                        <FormControlLabel value="male" control={<Radio />} label="Мужской" />
                    </RadioGroup>
                </FormControl>

                {/*<div className={classes.fieldLine}>*/}
                    {/*<TextField*/}
                        {/*onBlur={this.handleChangeSocial}*/}
                        {/*type="text"*/}
                        {/*label="Вы в VK(ссылка):"*/}
                        {/*name="vk"*/}
                        {/*value={this.state.socialNetworks.find(sc => sc.type === 'vk') &&*/}
                        {/*this.state.socialNetworks.find(sc => sc.type === 'vk').url}*/}
                    {/*/>*/}
                {/*</div>*/}

                {/*<div className={classes.fieldLine}>*/}
                    {/*<TextField*/}
                        {/*onBlur={this.handleChangeSocial}*/}
                        {/*type="text"*/}
                        {/*label="Вы в facebook(ссылка):"*/}
                        {/*name="facebook"*/}
                        {/*value={this.state.socialNetworks.find(sc => sc.type === 'facebook') &&*/}
                        {/*this.state.socialNetworks.find(sc => sc.type === 'facebook').url}*/}
                    {/*/>*/}
                {/*</div>*/}

                {/*<div className={classes.fieldLine}>*/}
                    {/*<TextField*/}
                        {/*onBlur={this.handleChangeSocial}*/}
                        {/*type="text"*/}
                        {/*label="Вы в VK(ссылка):"*/}
                        {/*name="twitter"*/}
                        {/*value={this.state.socialNetworks.find(sc => sc.type === 'twitter') &&*/}
                        {/*this.state.socialNetworks.find(sc => sc.type === 'twitter').url}*/}
                    {/*/>*/}
                {/*</div>*/}

                <Button
                    variant="raised"
                    color="secondary"
                    onClick={this.props.changeFormType}
                    className={classes.buttonLine}
                >
                    Назад
                </Button>

                <Button
                    variant="raised"
                    color="primary"
                    onClick={this.updateData}
                    className={classes.buttonLine}
                >
                    Сохранить
                </Button>

            </Paper>
        );

    }
}

const mapStateToProps = state => ({
    error: state.profile.error
});

const mapDispatchToProps = {
    profileUpdate: profileActions.profileUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileEditorForm));

