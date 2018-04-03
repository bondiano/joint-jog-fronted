import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles, TextField, Typography, Button } from 'material-ui';
import ScrollArea from 'react-scrollbar';
import Slide from 'material-ui/transitions/Slide';
import { CircularProgress } from 'material-ui/Progress';

import * as mapActions from '../map/MapActions';
import * as editorActions from './EditorActions';

import Preloader from '../common/Preloader';

import PointsList from './PointsList';
import { CreateEventFormStyles } from './EditorStyles';

class EventEditForm extends Component {

    static propTypes = {
        showEditor: PropTypes.bool,
        currentEvent: PropTypes.object.isRequired,
        createNewPoint: PropTypes.func.isRequired,
        removePoint: PropTypes.func.isRequired,
        changePointTitle: PropTypes.func.isRequired,
        showRoute: PropTypes.func.isRequired,
        hideRoute: PropTypes.func.isRequired,
        fetchEvent: PropTypes.func.isRequired,
        isSending: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        editCurrentPoints: PropTypes.func.isRequired,
        editEventRequest: PropTypes.func.isRequired,
        currentMapCenter: PropTypes.array.isRequired,
        currentPoints: PropTypes.array.isRequired,
        pointsList: PropTypes.array.isRequired,
        error: PropTypes.string.isRequired,
        match: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    static defaultProps = {
        showEditor: true
    };

    constructor(props) {
        super(props);
        this.state = {
            title: props.currentEvent.event && props.currentEvent.event.title,
            description: props.currentEvent.event && props.currentEvent.event.describe,
            date: props.currentEvent.event ?
                new Date(props.currentEvent.event.date).toISOString().substring(0, 16) :
                new Date().toISOString().substring(0, 16)
        };
    }

    componentDidMount() {
        this.props.hideRoute();        
        if (this.props.currentPoints.length) {
            this.props.editCurrentPoints();
        } else {
            const id = this.props.match.params.id;         
            this.props.fetchEvent(id);       
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentEvent !== nextProps.currentEvent) {
            const {event} = nextProps.currentEvent;
            this.setState({
                title: event.title,
                description: event.describe,
                date: new Date(event.date).toISOString().substring(0, 16)
            });
        }
    }
 
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.state.title, 
            id = this.props.match.params.id,
            description = this.state.description, 
            date = this.state.date,
            pointsList = this.props.pointsList;
        this.props.editEventRequest({id, title, description, date, pointsList, history: this.props.history});
    };

    addNewPoint = (e) => {
        const [latitude, longitude] = this.props.currentMapCenter;
        this.props.createNewPoint(latitude, longitude);
    };

    handlePointTitleChange = (index, pervTitle) => (e) => {
        if(!e.target.value || pervTitle === e.target.value) {
            return;
        }
        this.props.changePointTitle(index, e.target.value);
    };

    removePointHandler = (index) => (e) => {
        this.props.removePoint(index);
    };

    showRoute = () => {
        this.props.showRoute();
    };

    content = () => {
        const {classes} = this.props;
        return (
            <ScrollArea>
                <Typography className={classes.heading} variant="headline" component="h2">
                    Редактор пробежки
                </Typography>
                <form onSubmit={this.handleSubmit}>
                    <div className={classes.fieldLine}>
                        <TextField
                            onChange={this.handleChange}
                            required
                            type="textarea"
                            label="Заголовок"
                            name="title"
                            value={this.state.title}
                            margin="dense"
                        />
                    </div>

                    <div className={classes.fieldLine}>
                        <TextField
                            onChange={this.handleChange}                            
                            id="datetime-local"
                            required
                            label="Выберите дату"
                            type="datetime-local"
                            name="date"
                            value={this.state.date}
                            InputLabelProps={{shrink: true}}
                            margin="dense"
                        />
                    </div>

                    <div className={classes.fieldLine}>
                        <TextField
                            onChange={this.handleChange}
                            label="Описание"
                            name="description"
                            multiline
                            rows="4"
                            value={this.state.description}
                            margin="dense"
                        />
                    </div>

                    <PointsList 
                        pointsList={this.props.pointsList}
                        removePointHandler={this.removePointHandler}
                        handlePointTitleChange={this.handlePointTitleChange}
                    />

                    {this.props.pointsList.length > 1 && <Button 
                        className={classes.routeButton}
                        color="primary"
                        aria-label="add"
                        onClick={this.showRoute}
                        disabled={this.props.isSending}
                    >
                        Показать маршрут
                    </Button>}
                    <div className={classes.buttonsWrapper}>
                        <div className={classes.wrapper}>
                            <Button 
                                className={classes.submitButton}
                                variant="raised"                             
                                color="primary" 
                                aria-label="send"
                                type="submit"
                                disabled={this.props.isSending}
                            >
                                Отправить
                            </Button>
                            {this.props.isSending && <CircularProgress size={32} className={classes.fabProgress}/>}
                        </div>
                        <div className={classes.wrapper}>
                            <Button 
                                className={classes.submitButton}
                                variant="raised" 
                                color="secondary"
                                aria-label="add"
                                onClick={this.addNewPoint}
                                disabled={this.props.isSending}
                            >
                                Добавить точку
                            </Button>
                        </div>
                    </div>
                </form>
            </ScrollArea>
        );
    };

    render() {
        const {classes, showEditor} = this.props;        
        return (
            <Slide direction="left" mountOnEnter unmountOnExit in={showEditor}>
                <div className={classes.root}>
                    {this.props.isLoading || this.props.error ? <Preloader/> : this.content()}
                </div>
            </Slide>
        );

    }
}

const mapStateToProps = (state) => ({
    isSending: state.editor.isSending,
    isLoading: state.editor.isLoading,
    error: state.editor.error,
    currentMapCenter: state.map.currentMap.center,
    pointsList: state.map.editorPointsList,
    currentPoints: state.map.currentEventPointsList,
    currentEvent: state.events.currentEvent
});

const mapDispatchToProps = {
    createNewPoint: mapActions.createNewPoint,
    removePoint: mapActions.removePoint,
    changePointTitle: mapActions.changePointTitle,
    showRoute: mapActions.showRoute,
    hideRoute: mapActions.hideRoute,    
    editCurrentPoints: mapActions.editCurrentPoints,
    editEventRequest: editorActions.editEventRequest,
    fetchEvent: editorActions.fetchEventRequest
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(CreateEventFormStyles)(EventEditForm)));