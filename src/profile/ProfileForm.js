import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper, withStyles, TextField, Button, InputLabel, Select, MenuItem, FormControl } from 'material-ui';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import * as profileActions from './ProfileActions';
import * as eventsActions from '../events/EventsActions';
import { ProfileStyles } from './ProfileStyles';


class ProfileForm extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        profileRequest: PropTypes.func.isRequired,
        profileUpdate: PropTypes.func.isRequired,
        removeEvent: PropTypes.func.isRequired,
        profileError: PropTypes.string.isRequired,
        unsubscribeEventError: PropTypes.string.isRequired,
        profileData: PropTypes.object.isRequired,
        profileEvents: PropTypes.array.isRequired,
        currentUserUsername: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            data: {
                username: '',
                email: '',
                password: '',
                check_password: '',
                socialNetworks: '',
                firstName: '',
                lastName: '',
                age: '',
                sex: ''
            },
            errors: {
                username: '',
                email: '',
                password: '',
                check_password: '',
                firstName: '',
                lastName: '',
                age: ''
            },
            isValid: {
                username: true,
                email: true,
                password: true,
                check_password: true,
                firstName: true,
                lastName: true,
                age: true
            },
            iValidForm: true
        };
    }

    componentWillMount() {
        this.props.profileRequest(this.props.match.params.username);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: {
                ...nextProps.profileData
            },})
    }

    toEvent = (eventId) => {
        this.props.history.push(`/event/${eventId}`);
    };

    unsubscribe(eventId) {
        console.log(eventId);
        this.props.removeEvent(eventId);
    };

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
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
                        <div>
                            <TextField
                                onChange={this.handleChange}
                                type="text"
                                label="Возраст"
                                name="age"
                                value={this.state.data.age}
                                error={!this.state.isValid.age}
                            />
                            <Typography variant="caption" color="error" className={classes.errors}>{this.state.errors.lastName}</Typography>
                        </div>
                        {/*<div>*/}
                        {/*<FormControl className={classes.formControl}>*/}
                            {/*<InputLabel>Age</InputLabel>*/}
                            {/*<Select*/}
                                {/*value={this.state.age}*/}
                                {/*onChange={this.handleChange}*/}
                                {/*inputProps={{*/}
                                    {/*name: 'age'*/}
                                {/*}}*/}
                            {/*>*/}
                                {/*<MenuItem value=''>*/}
                                    {/*<em>None</em>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem value="male">Мужской</MenuItem>*/}
                                {/*<MenuItem value="female">Женский</MenuItem>*/}
                            {/*</Select>*/}
                        {/*</FormControl>*/}
                        {/*</div>*/}
                    </div>
                    :
                    <div>
                        It's not your pa9e!
                    </div>
                    }
                </Paper>
                <Paper>
                    <Typography className={classes.cardHeading} variant="headline" component="h2">Пробежки</Typography>
                    <Table className={classes.table}>
                        <TableBody>
                            {this.props.profileEvents.map(ev => {
                                return (
                                    <TableRow key={ev._id}>
                                        <TableCell>{ev.title}</TableCell>
                                        <TableCell>{(new Date(ev.date)).toDateString()}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="raised"
                                                color="primary"
                                                type="submit"
                                                onClick={() => this.toEvent(ev._id)}
                                            >
                                                На карте
                                            </Button>
                                        </TableCell>
                                        {isCurrentUser &&
                                        <TableCell>
                                            <Button
                                                variant="raised"
                                                color="secondary"
                                                type="submit"
                                                onClick={() => this.unsubscribe(ev._id)}
                                            >
                                                Не пойду
                                            </Button>
                                        </TableCell>}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
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

