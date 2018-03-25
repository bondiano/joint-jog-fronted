import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper, withStyles, TextField } from 'material-ui';


import * as profileActions from './ProfileActions';
import * as eventsActions from '../events/EventsActions';
import { ProfileStyles } from './ProfileStyles';


class ProfileForm extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        profileRequest: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            data: {
                username: this.props.profileData.username,
                email: this.props.profileData.email,
                password: this.props.profileData.password,
                check_password: this.props.profileData.check_password,
                socialNetworks: this.props.profileData.socialNetworks,
                firstName: this.props.profileData.firstName,
                lastName: this.props.profileData.lastName,
                age: this.props.profileData.age,
                sex: this.props.profileData.sex
            },
            errors: {
                username: '',
                email: '',
                password: '',
                check_password: '',
                firstName: '',
                lastName: ''
            },
            isValid: {
                username: true,
                email: true,
                password: true,
                check_password: true,
                firstName: true,
                lastName: true
            },
            iValidForm: true
        };
    }

    componentDidMount() {
        this.props.profileRequest(this.props.match.params.username);
    }

    toEvent = (eventId) => {
        this.props.history.push(`/events/${eventId}`);
    };

    unsubscribe = (eventId) => {
        this.props.unsubscribe(eventId);
    };

    render() {
        const { classes } = this.props;
        const isCurrentUser = this.props.match.params.username === this.props.currentUserUsername;
        return (
            <div className={classes.root}>
                <Paper>
                    <Typography className={classes.cardHeading} variant="headline" component="h2">Профиль</Typography>
                    {isCurrentUser ?
                    <div>
                        <div className={classes.fieldLine}>
                            <TextField
                                onChange={this.handleChange}
                                type="text"
                                label="Логин"
                                name="username"
                                value={this.state.data.username}
                                error={!this.state.isValid.username}
                            />
                            <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.username}</Typography>
                        </div>
                        <div className={classes.fieldLine}>
                            <TextField
                                onChange={this.handleChange}
                                type="password"
                                label="Пароль"
                                name="password"
                                value={this.state.data.password}
                                error={!this.state.isValid.password}
                            />
                            <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.password}</Typography>
                            <TextField
                                onChange={this.handleChange}
                                type="password"
                                label="Старый пароль"
                                name="check_password"
                                value={this.state.data.check_password}
                                error={!this.state.isValid.check_password}
                            />
                            <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.check_password}</Typography>
                        </div>
                        <div className={classes.fieldLine}>
                            <TextField
                                onChange={this.handleChange}
                                type="text"
                                label="Имя"
                                name="firstName"
                                value={this.state.data.firstName}
                                error={!this.state.isValid.firstName}
                            />
                            <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.firstName}</Typography>
                        </div>
                        <div className={classes.fieldLine}>
                            <TextField
                                onChange={this.handleChange}
                                type="text"
                                label="Фамилия"
                                name="lastName"
                                value={this.state.data.lastName}
                                error={!this.state.isValid.lastName}
                            />
                            <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.lastName}</Typography>
                        </div>
                    </div>
                    :
                    <div>
                        It's not your pa9e!
                    </div>
                    }
                </Paper>
                <Paper>
                    <Typography className={classes.cardHeading} variant="headline" component="h2">Пробежки</Typography>
                </Paper>


            </div>
        );
    }
}

const mapStateToProps = state => ({
    profileError: state.profile.error,
    unsubscribeEventError: state.events.error,
    profileData: state.profile.data,
    profileEvents: state.profile.events,
    currentUserUsername: state.auth.username
});

const mapDispatchToProps = {
    profileRequest: profileActions.profileRequest,
    profileUpdate: profileActions.profileUpdate,
    removeEvent: eventsActions.unsubscribeEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProfileStyles)(ProfileForm));

