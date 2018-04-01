import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, CircularProgress } from 'material-ui';

import * as profileActions from './ProfileActions';
import { ProfileStyles } from './ProfileStyles';
import EventsTable from "./EventsTable";
import ProfileInfo from "./ProfileInfo";
import ProfileEditor from "./ProfileEditor";

class ProfileForm extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        isLoadingData: PropTypes.bool.isRequired,
        isLoadingEvents: PropTypes.bool.isRequired,
        profileData: PropTypes.object.isRequired,
        profileEvents: PropTypes.array.isRequired,
        currentUserUsername: PropTypes.string.isRequired,
        profileDataRequest: PropTypes.func.isRequired,
        profileEventsRequest: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isEditor: false
        };
    }

    componentWillMount() {
        this.props.profileDataRequest(this.props.currentUserUsername);
        this.props.profileEventsRequest(this.props.currentUserUsername);
    }

    changeFormType = () => {
        this.setState((prevState, props) => {
            return {isEditor: !prevState.isEditor};
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {this.props.isLoadingData ?
                    <CircularProgress size={32} className={classes.fabProgress}/> :
                    <div>{this.state.isEditor ?
                        <ProfileEditor
                            data={this.props.profileData}
                            changeFormType={this.changeFormType}
                            history={this.props.history}
                        /> :
                        <ProfileInfo
                            data={this.props.profileData}
                            isCurrentUser={true}
                            changeFormType={this.changeFormType}
                            isSending={this.props.isSending}
                        />
                    }</div>
                }
                {this.props.isLoadingEvents ?
                    <CircularProgress size={32} className={classes.fabProgress}/> :
                    <EventsTable
                        events={this.props.profileEvents}
                        isCurrentUser={true}
                        history={this.props.history}
                        username={this.props.currentUserUsername}
                    />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profileData: state.profile.profile,
    profileEvents: state.profile.events,
    isLoadingData: state.profile.isLoadingData,
    isLoadingEvents: state.profile.isLoadingEvents,
    currentUserUsername: state.auth.username
});

const mapDispatchToProps = {
    profileDataRequest: profileActions.profileDataRequest,
    profileEventsRequest: profileActions.profileEventsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProfileStyles)(ProfileForm));

