import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles} from 'material-ui';
import ScrollArea from 'react-scrollbar';

import * as profileActions from './ProfileActions';
import { ProfileStyles } from './ProfileStyles';
import EventsTable from "./EventsTable";
import ProfileInfo from "./ProfileInfo";

class ProfileForm extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        isSending: PropTypes.bool.isRequired,
        profileData: PropTypes.object.isRequired,
        profileEvents: PropTypes.array.isRequired,
        currentUserUsername: PropTypes.string.isRequired,
        profileDataRequest: PropTypes.func.isRequired,
        profileEventsRequest: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        if (this.props.match.params.username === this.props.currentUserUsername) {
            this.props.history.push('/profile');
        }
    }

    componentWillMount() {
        this.props.profileDataRequest(this.props.match.params.username);
        this.props.profileEventsRequest(this.props.match.params.username);
    }

    render() {
        const { classes } = this.props;
        return (
            <ScrollArea>
                <div className={classes.root}>
                    <ProfileInfo
                        data={this.props.profileData}
                        isCurrentUser={false}
                        isSending={this.props.isSending}
                    />
                    <EventsTable
                        events={this.props.profileEvents}
                        isCurrentUser={false}
                        history={this.props.history}
                    />
                </div>
            </ScrollArea>
        );
    }
}

const mapStateToProps = state => ({
    profileData: state.profile.profile,
    profileEvents: state.profile.events,
    isSending: state.profile.isSending,
    currentUserUsername: state.auth.username
});

const mapDispatchToProps = {
    profileDataRequest: profileActions.profileDataRequest,
    profileEventsRequest: profileActions.profileEventsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProfileStyles)(ProfileForm));

