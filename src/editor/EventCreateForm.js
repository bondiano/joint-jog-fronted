import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, TextField, Typography, Button } from 'material-ui';
import ScrollArea from 'react-scrollbar';
import Slide from 'material-ui/transitions/Slide';
import { CircularProgress } from 'material-ui/Progress';
import { withRouter } from 'react-router-dom';

import * as mapActions from '../map/MapActions';
import * as editorActions from './EditorActions';

import PointsList from './PointsList';
import { CreateEventFormStyles } from './EditorStyles';

class EventCreateForm extends Component {

    static propTypes = {
        showEditor: PropTypes.bool,
        createNewPoint: PropTypes.func.isRequired,
        removePoint: PropTypes.func.isRequired,
        changePointTitle: PropTypes.func.isRequired,
        showRoute: PropTypes.func.isRequired,
        isSending: PropTypes.bool.isRequired,
        createNewPointRequest: PropTypes.func.isRequired,
        currentMapCenter: PropTypes.array.isRequired,
        pointsList: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    static defaultProps = {
        showEditor: true
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date: new Date().toISOString().substring(0, 16)
        };
    }
 
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.state.title, 
            description = this.state.description, 
            date = this.state.date, 
            pointsList = this.props.pointsList;
        this.props.createNewPointRequest({title, description, date, pointsList, history: this.props.history});
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

    render() {
        const {classes, showEditor} = this.props;
        return (
            <Slide direction="left" mountOnEnter unmountOnExit in={showEditor}>
            <div className={classes.root}>
                <ScrollArea>
                    <Typography className={classes.heading} variant="headline" component="h2">
                        Новая пробежка
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
                </div>
            </Slide>
        );
    }
}

const mapStateToProps = (state) => ({
    isSending: state.editor.isSending,
    currentMapCenter: state.map.currentMap.center,
    pointsList: state.map.editorPointsList
});

const mapDispatchToProps = {
    createNewPoint: mapActions.createNewPoint,
    removePoint: mapActions.removePoint,
    changePointTitle: mapActions.changePointTitle,
    showRoute: mapActions.showRoute,
    createNewPointRequest: editorActions.createNewEventRequest,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(CreateEventFormStyles)(EventCreateForm)));