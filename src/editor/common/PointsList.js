import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, Typography, Button } from 'material-ui';
import {EditorModalStyles} from '../EditorStyles';

const PointsList = ({classes}) => (
    <div className={classes.pointsListContainer}>
        <Typography className={classes.heading} variant="headline" component="h2">
            Маршрут
        </Typography>
    </div>
);

PointsList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(EditorModalStyles)(PointsList);