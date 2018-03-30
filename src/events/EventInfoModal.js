import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Button } from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';

import ScrollArea from 'react-scrollbar';
import Slide from 'material-ui/transitions/Slide';

import ModalComponent from '../common/ModalComponent';
import * as actions from './EventsActions';
import * as mapActions from '../map/MapActions';

import { EventInfoModalStyles } from './EventsStyles';
import { connect } from 'react-redux';

class EventInfoModal extends Component {
    static propTypes ={
        showEditor: PropTypes.bool,
        error: PropTypes.string.isRequired,
        event: PropTypes.object.isRequired,
        isAuth: PropTypes.bool.isRequired,
        username: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
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
        this.props.hideRoute();
    }

    loader = () => {
        const {classes} = this.props;
        return (
            <div className={classes.loader}>
                <Typography className={classes.heading} variant="headline" component="h2">
                    <CircularProgress className={classes.progress} thickness={7} />
                </Typography>
            </div>
        );
    };

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

    content = () => {
        const {classes, event: {event}} = this.props;
        const usernames = this.props.event.usernames.map(user => user.username);
        return (
            <ScrollArea>
                <Typography className={classes.heading} variant="headline" component="h2">
                    {event.title}
                </Typography>
                {event.describe && <Typography className={classes.textLine}>
                    <b>Описание:</b> {event.describe}
                </Typography>}
                <Typography className={classes.textLine}>
                    <b>Создатель:</b> {event.owner}
                </Typography>
                <Typography className={classes.textLine}>
                    <b>Дата и время:</b> {new Date(event.date).toLocaleString('ru')}
                </Typography>
                <Typography className={classes.heading}>
                    <b>Также пойдут:</b>
                </Typography>
                {usernames.map((username, index) => (
                    <Typography className={classes.textLine} key={index}>
                        <b>{index + 1}.</b> {username}
                    </Typography>
                ))}
                <div className={classes.wrapButton}>
                    <Button color="primary" className={classes.button} onClick={this.showRoute}>
                        {event.points.length > 1 ? 'Показать маршрут' : 'Показать точку старта'}
                    </Button>
                    {this.props.isAuth && (usernames.includes(this.props.username) ? 
                        <Button color="secondary" variant="raised" className={classes.button} onClick={this.unsubscribe}>
                            Не пойду
                        </Button>
                    : <Button color="primary" variant="raised" className={classes.button} onClick={this.subscribe}>
                        Тоже пойду
                    </Button>)}
                </div>
                {this.props.isAuth && this.props.username === event.owner
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
                        {this.props.isLoading 
                            || this.props.error 
                            || !this.props.event.event ? this.loader() : this.content()}
                    </div>
                </Slide>
            </ModalComponent>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.events.isLoading,
    event: state.events.currentEvent,
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