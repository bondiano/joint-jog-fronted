import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper, withStyles } from 'material-ui';


import * as profileActions from './ProfileActions';
import * as eventsActions from '../events/EventsActions';
import { ProfileStyles } from './ProfileStyles';


class ProfileForm extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        profileRequest: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.profileRequest(this.props.match.params.username);
        // if (this.props.match.params.username === this.props.currentUserUsername) {
        //     this.setState({isCurrentUser: true});
        // }
    }

    toEvent = (eventId) => {
        this.props.history.push(`/events/${eventId}`);
    };

    unsubscribe = (eventId) => {
        this.props.unsubscribe(eventId);
    };

    render() {
        const { classes } = this.props;
        console.log(this.props.profileData);
        return (
            <div className={classes.root}>
                <Typography >Профиль</Typography>
                <Paper>
                    <Typography>Ваши данные</Typography>
                    <Typography variant="display4">{this.props.profileData.username}</Typography>
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

