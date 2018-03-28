import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper, withStyles, TextField, Button, InputLabel, Select, MenuItem, FormControl } from 'material-ui';

import * as profileActions from './ProfileActions';
import * as eventsActions from '../events/EventsActions';
import { ProfileStyles } from './ProfileStyles';
import EventsTableForm from "./EventsTableForm";
import ProfileStaticForm from "./ProfileStaticForm";
import ProfileEditorForm from "./ProfileEditorForm";

class ProfileForm extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        profileData: PropTypes.object.isRequired,
        profileEvents: PropTypes.array.isRequired,
        currentUserUsername: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isEditorForm: false
        };
    }

    componentWillMount() {
        this.props.profileRequest(this.props.match.params.username);
    }

    getData = () => {
        this.props.profileRequest(this.props.match.params.username);
    }

    changeFormType = () => {
        this.setState((prevState, props) => {
            return {isEditorForm: !prevState.isEditorForm}
        })
    };

    render() {
        const { classes } = this.props;
        const isCurrentUser = this.props.match.params.username === this.props.currentUserUsername;

        return (
            <div className={classes.root}>
                {this.state.isEditorForm ?
                    <ProfileEditorForm
                        data={this.props.profileData}
                        changeFormType={this.changeFormType}
                        username={this.props.match.params.username}
                        getData={this.getData}
                    /> :
                    <ProfileStaticForm
                        data={this.props.profileData}
                        isCurrentUser={isCurrentUser}
                        changeFormType={this.changeFormType}
                    />
                }
                <EventsTableForm
                    events={this.props.profileEvents}
                    isCurrentUser={isCurrentUser}
                    history={this.props.history}
                    getData={this.getData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profileData: state.profile.data,
    profileEvents: state.profile.events,
    currentUserUsername: state.auth.username
});

const mapDispatchToProps = {
    profileRequest: profileActions.profileRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProfileStyles)(ProfileForm));

