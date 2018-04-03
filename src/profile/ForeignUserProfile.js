import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, CircularProgress } from 'material-ui';
import ScrollArea from 'react-scrollbar';

import * as profileActions from './ProfileActions';
import { ProfileStyles } from './ProfileStyles';
import EventsTable from "./EventsTable";
import ProfileInfo from "./ProfileInfo";

class ForeignUserProfile extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        profileData: PropTypes.object.isRequired,
        profileEvents: PropTypes.array.isRequired,
        currentUserUsername: PropTypes.string.isRequired,
        profileDataRequest: PropTypes.func.isRequired,
        profileEventsRequest: PropTypes.func.isRequired,
        isLoadingData: PropTypes.bool.isRequired,
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
                    {this.props.isLoadingData ?
                        <CircularProgress size={32} className={classes.fabProgress}/> :
                        <div>
                            <ProfileInfo
                                data={this.props.profileData}
                                isCurrentUser={false}
                            />
                            <EventsTable
                                events={this.props.profileEvents}
                                isCurrentUser={false}
                                history={this.props.history}
                                username={this.props.profileData.username}
                            />
                        </div>
                    }
                </div>
            </ScrollArea>
        );
    }
}

const mapStateToProps = state => ({
    profileData: state.profile.profile,
    profileEvents: state.profile.events,
    currentUserUsername: state.auth.username,
    isLoadingData: state.profile.isLoadingData
});

const mapDispatchToProps = {
    profileDataRequest: profileActions.profileDataRequest,
    profileEventsRequest: profileActions.profileEventsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProfileStyles)(ForeignUserProfile));

