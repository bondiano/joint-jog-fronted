import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, Typography } from 'material-ui';
import Slide from 'material-ui/transitions/Slide';
import asPopup from '../popup/asPopup';
import ErrorOutline from 'material-ui-icons/ErrorOutline';

import { NotificationStyles } from './CommonStyles';

const ErrorNotification = ({classes, popup: {hide, action, order, show}}) => {
    return (
        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
            <Card className={classes.error}>
                <Typography className={classes.errorMessage}><ErrorOutline className={classes.errorIcon}/> Произошла ошибка!</Typography>
            </Card>
        </Slide>
    );
};

ErrorNotification.defaultProps = {
    show: false
};

ErrorNotification.propTypes = {
    classes: PropTypes.object.isRequired,
    popup: PropTypes.object.isRequired
};

const notificationTypes = [], 
    notificationOptions = { 
        hideAfter: 2000, 
        type: 'error', 
        maxCount: 1
    };

export default withStyles(NotificationStyles)(asPopup(notificationTypes, notificationOptions)(ErrorNotification));