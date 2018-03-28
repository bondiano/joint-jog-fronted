import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles} from 'material-ui';

import * as profileActions from './ProfileActions';
import { ProfileStyles } from './ProfileStyles';
import EventsTable from "./EventsTable";
import ProfileInfo from "./ProfileInfo";

class ProfileForm extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        profileData: PropTypes.object.isRequired,
        profileEvents: PropTypes.array.isRequired,
        currentUserUsername: PropTypes.string.isRequired,
        profileDataRequest: PropTypes.func.isRequired,
        profileEventsRequest: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.profileDataRequest(this.props.match.params.username);
        this.props.profileEventsRequest(this.props.match.params.username);
    }

    render() {
        if (this.props.match.params.username === this.props.currentUserUsername) {
            this.props.history.push('/profile');
        }
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ProfileInfo
                    data={this.props.profileData}
                    isCurrentUser={false}
                />
                <EventsTable
                    events={this.props.profileEvents}
                    isCurrentUser={false}
                    history={this.props.history}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profileData: state.profile.profile,
    profileEvents: state.profile.events,
    currentUserUsername: state.auth.username
});

const mapDispatchToProps = {
    profileDataRequest: profileActions.profileDataRequest,
    profileEventsRequest: profileActions.profileEventsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProfileStyles)(ProfileForm));

