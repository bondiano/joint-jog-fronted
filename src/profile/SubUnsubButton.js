import React from 'react';
import PropTypes from 'prop-types';
import { Button, Hidden, withStyles } from 'material-ui';
import { connect } from "react-redux";
import AddIcon from 'material-ui-icons/Add';
import RemoveIcon from 'material-ui-icons/Remove';

import * as eventsActions from "../events/EventsActions";
import { ProfileStyles } from './ProfileStyles';

class SubUnsubButton extends React.Component {
    static propTypes = {
        unsubscribeEvent: PropTypes.func.isRequired,
        subscribeEvent: PropTypes.func.isRequired,
        eventId: PropTypes.string.isRequired,
        isCurrentUser: PropTypes.bool.isRequired,
        eventSubscribers: PropTypes.array.isRequired,
        currentUserId: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
        username: PropTypes.string.isRequired
    };

    subEvent = (eventId) => (e) => {
        this.props.subscribeEvent(eventId, null, this.props.username);
    };

    unsubEvent = (eventId) => (e) => {
        this.props.unsubscribeEvent(eventId, null, this.props.username);
    };

    render() {
        const {eventId, isCurrentUser, eventSubscribers, currentUserId, classes} = this.props;
        const isSubscribed = eventSubscribers.indexOf(currentUserId) === -1;
        return (
            <div>
                {isCurrentUser ?
                    <div>
                        <Hidden smDown>
                            <Button
                                variant="raised"
                                color="secondary"
                                type="submit"
                                onClick={this.unsubEvent(eventId)}
                                size="small"
                            >
                                Не пойду
                            </Button>
                        </Hidden>
                        <Hidden mdUp>
                            <Button
                                variant="fab"
                                mini
                                color="secondary"
                                onClick={this.unsubEvent(eventId)}>
                                <RemoveIcon/>
                            </Button>
                        </Hidden>
                    </div>
                    :
                    <div>
                        <Hidden smDown>
                            <Button
                                variant="raised"
                                color="secondary"
                                type="submit"
                                onClick={this.subEvent(eventId)}
                                size="small"
                                disabled={isSubscribed}
                                className={classes.button}
                            >
                                {isSubscribed ? 'Вы идете' : 'Пойду тоже'}
                            </Button>
                        </Hidden>
                        <Hidden mdUp>
                            <Button
                                variant="fab"
                                mini
                                color="primary"
                                onClick={this.subEvent(eventId)}
                                disabled={isSubscribed}
                            >
                                <AddIcon/>
                            </Button>
                        </Hidden>
                    </div>
                }
            </div>
        )
    };
}

const mapStateToProps = state => ({
    currentUserId: state.auth.id
});

const mapDispatchToProps = {
    unsubscribeEvent: eventsActions.unsubscribeEventRequest,
    subscribeEvent: eventsActions.subscribeEventRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProfileStyles)(SubUnsubButton));
