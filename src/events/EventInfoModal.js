import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Button, Chip } from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';

import ScrollArea from 'react-scrollbar';
import Slide from 'material-ui/transitions/Slide';

import Preloader from '../common/Preloader';
import ModalComponent from '../common/ModalComponent';
import * as actions from './EventsActions';
import * as mapActions from '../map/MapActions';

import { EventInfoModalStyles } from './EventsStyles';
import { connect } from 'react-redux';

class EventInfoModal extends Component {
    static propTypes ={
        showEditor: PropTypes.bool,
        error: PropTypes.string.isRequired,
        eventTitle: PropTypes.string.isRequired, 
        eventDescribe: PropTypes.string.isRequired, 
        eventOwner: PropTypes.string.isRequired, 
        eventSubscribers: PropTypes.array.isRequired, 
        eventDate: PropTypes.string.isRequired, 
        eventPoints: PropTypes.array.isRequired,
        isAuth: PropTypes.bool.isRequired,
        username: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isSubscribing: PropTypes.bool.isRequired,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        subscribe: PropTypes.func.isRequired,
        unsubscribe: PropTypes.func.isRequired,
        fetchEvent: PropTypes.func.isRequired,
        hideRoute: PropTypes.func.isRequired,
        showRoute: PropTypes.func.isRequired
    }

    static defaultProps = {
        showEditor: true
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchEvent(id);
    }

    subscribe = () => {
        const id = this.props.match.params.id;
        this.props.subscribe(id, this.props.history);
    };

    unsubscribe = () => {
        const id = this.props.match.params.id;
        this.props.unsubscribe(id, this.props.history);
    }

    showRoute = () => {
        this.props.showRoute();
    };

    toEditor = () => {
        const id = this.props.match.params.id;
        this.props.history.push(`/editor/${id}`);
    }

    toProfile = (username) => (e) => {
        this.props.history.push(`/profile/${username}`);
    }

    content = () => {
        const {classes, eventTitle, eventDescribe, eventOwner, eventSubscribers, eventDate, eventPoints} = this.props;
        return (
            <ScrollArea>
                <Typography className={classes.heading} variant="headline" component="h2">
                    {eventTitle}
                </Typography>
                {eventDescribe && <Typography className={classes.textLine}>
                    <b>Описание:</b> {eventDescribe}
                </Typography>}
                <Typography className={classes.textLine}>
                    <b>Создатель:</b> <Chip label={eventOwner} onClick={this.toProfile(eventOwner)} component="span"/>
                </Typography>
                <Typography className={classes.textLine}>
                    <b>Дата и время:</b> {eventDate}
                </Typography>
                <Typography className={classes.heading}>
                    <b>Участники:</b>
                </Typography>
                {eventSubscribers.map((username, index) => (
                    <Typography className={classes.textLine} key={index}>
                        <b>{index + 1}.</b> <Chip label={username} onClick={this.toProfile(username)} component="span"/>
                    </Typography>
                ))}
                <div className={classes.wrapButton}>
                    <Button color="primary" className={classes.button} onClick={this.showRoute}>
                        {eventPoints.length > 1 ? 'Показать маршрут' : 'Показать точку старта'}
                    </Button>
                    {this.props.isAuth && (eventSubscribers.includes(this.props.username) ? 
                    <div className={classes.wrapper}>
                        <Button color="secondary" variant="raised" className={classes.button} disabled={this.props.isSubscribing} onClick={this.unsubscribe}>
                            Не пойду
                        </Button>
                        {this.props.isSubscribing && <CircularProgress size={32} className={classes.fabProgressUnsub}/>}                        
                    </div>
                    : <div className={classes.wrapper}>
                        <Button color="primary" variant="raised" className={classes.button} disabled={this.props.isSubscribing} onClick={this.subscribe}>
                            Тоже пойду
                        </Button>
                        {this.props.isSubscribing && <CircularProgress size={32} className={classes.fabProgressSub}/>}                        
                    </div>)}
                </div>
                {this.props.isAuth && this.props.username === eventOwner
                && <Button color="secondary" className={classes.button} onClick={this.toEditor}>
                    Редактировать
                </Button>}
            </ScrollArea>
        );
    }

    render() {
        const {classes, showEditor} = this.props;
        return (
            <ModalComponent>
                <Slide direction="left" mountOnEnter unmountOnExit in={showEditor}>
                    <div className={classes.root}>
                        {this.props.isLoading || this.props.error ? <Preloader/> : this.content()}
                    </div>
                </Slide>
            </ModalComponent>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.events.isLoading,
    isSubscribing: state.events.isSubscribing,
    event: state.events.currentEvent,
    eventTitle: state.events.currentEvent.event.title,
    eventDescribe: state.events.currentEvent.event.describe,
    eventOwner: state.events.currentEvent.event.owner,
    eventDate: new Date(state.events.currentEvent.event.date).toLocaleString('ru'),
    eventSubscribers: state.events.currentEvent.usernames.map(user => user.username),
    eventPoints: state.events.currentEvent.event.points,
    error: state.events.error,
    isAuth: state.auth.isAuth,
    username: state.auth.username
});

const mapDispatchToProps = {
    subscribe: actions.subscribeEventRequest,
    unsubscribe: actions.unsubscribeEventRequest,
    showRoute: mapActions.showRoute,
    hideRoute: mapActions.hideRoute,
    fetchEvent: actions.fetchEventRequest
};

export default withStyles(EventInfoModalStyles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(EventInfoModal)));