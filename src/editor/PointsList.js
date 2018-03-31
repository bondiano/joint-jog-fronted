import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, TextField, Button, Tooltip } from 'material-ui';
import List, { ListItem } from 'material-ui/List';
import { CreateEventFormStyles } from './EditorStyles';
import DeleteIcon from 'material-ui-icons/Delete';


const PointsList = ({pointsList, removePointHandler, handlePointTitleChange, classes}) => (
    <List className={classes.pointsListContainer}>
        <Typography className={classes.modalHeading} variant="headline" component="h2">
            Маршрут
        </Typography>
            {pointsList.map((point, index) => {
                    return (
                    <ListItem key={index} className={classes.pointEdit}>
                        <TextField
                            type="textarea"
                            label={point.title ? point.title : `Название точки ${index + 1}`}
                            name="pointTitle"
                            margin="dense"
                            onBlur={handlePointTitleChange(index)}
                        />
                        <Tooltip id="tooltip-fab" title="Удалить" placement="top">
                            <Button 
                                size="small" 
                                color="secondary" 
                                aria-label="delete" 
                                className={classes.pointButton}
                                onClick={removePointHandler(index)}                    
                            >
                                <DeleteIcon/>
                            </Button>
                        </Tooltip>
                    </ListItem>
                );}
            )}
    </List>
);

PointsList.propTypes = {
    pointsList: PropTypes.array.isRequired,
    removePointHandler: PropTypes.func.isRequired,
    handlePointTitleChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(CreateEventFormStyles)(PointsList);