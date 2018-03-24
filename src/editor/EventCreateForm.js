import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import { CreateEventFormStyles } from './EditorStyles';

const EventCreateForm = ({classes}) => {
    return (
        <div className={classes.root}>
            <p>
                Meow
            </p>
        </div>
    );
};

EventCreateForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(CreateEventFormStyles)(EventCreateForm);