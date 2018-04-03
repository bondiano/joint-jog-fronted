import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';
import { PreloaderStyles } from './CommonStyles';

const Preloader = ({classes}) => (
        <div className={classes.loader}>
            <Typography className={classes.heading} variant="headline" component="h2">
                <CircularProgress className={classes.progress} thickness={7} />
            </Typography>
        </div>
);

Preloader.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(PreloaderStyles)(Preloader);