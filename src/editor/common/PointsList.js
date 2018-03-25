import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, TextField, Button, Tooltip } from 'material-ui';
import { EditorModalStyles } from '../EditorStyles';
import DeleteIcon from 'material-ui-icons/Delete';
import GpsFixed from 'material-ui-icons/GpsFixed';


const PointsList = ({pointsList, removePointHandler, showPointOnMap, handlePointTitleChange, classes}) => (
    <div className={classes.pointsListContainer}>
        <Typography className={classes.heading} variant="headline" component="h2">
            Маршрут
        </Typography>
        {pointsList.map((point, index) => {
            return (
            <div key={index} className={classes.pointEdit}>
                <TextField
                    type="textarea"
                    label={point.title ? point.title : `Название точки ${index + 1}`}
                    name="pointTitle"
                    margin="dense"
                    onChange={handlePointTitleChange(index)}
                />
                <Tooltip id="tooltip-fab" title="Выделить точку" placement="top">
                    <Button 
                        size="small" 
                        color="primary" 
                        aria-label="select"
                        className={classes.pointButton}
                        onClick={showPointOnMap(index)}
                    >
                        <GpsFixed/>
                    </Button>
                </Tooltip>
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
            </div>
        );}
    )}
    </div>
);

PointsList.propTypes = {
    pointsList: PropTypes.array.isRequired,
    removePointHandler: PropTypes.func.isRequired,
    showPointOnMap: PropTypes.func.isRequired,
    handlePointTitleChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(EditorModalStyles)(PointsList);