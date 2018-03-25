import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, Typography, Button } from 'material-ui';
import Slide from 'material-ui/transitions/Slide';

import PointsList from './common/PointsList';
import { CreateEventFormStyles } from './EditorStyles';

class EventCreateForm extends Component {

    static propTypes = {
        showEditor: PropTypes.bool,
        classes: PropTypes.object.isRequired
    };

    static defaultProps = {
        showEditor: true
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date: new Date().toISOString().substring(0, 16),
            pointsList: []
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
        console.log(e.target);
    } 

    addNewPoint = (e) => {
        console.log(e.target);        
    }

    render() {
        const {classes, showEditor} = this.props;
        return (
            <Slide direction="left" mountOnEnter unmountOnExit in={showEditor}>
                <div className={classes.root}>
                    <Typography className={classes.heading} variant="headline" component="h2">
                        Новая пробежка
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <div className={classes.fieldLine}>
                            <TextField
                                onChange={this.handleChange}
                                autoFocus
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

                        <PointsList/>

                        <Button 
                            className={classes.submitButton}
                            color="primary" 
                            aria-label="send"
                            type="submit"
                        >
                            Отправить
                        </Button>

                        <Button 
                            className={classes.submitButton}
                            color="primary" 
                            aria-label="add"
                            onClick={this.addNewPoint}
                        >
                            Добавить точку
                        </Button>
                    </form>
                </div>
            </Slide>
        );
    }
}


export default withStyles(CreateEventFormStyles)(EventCreateForm);