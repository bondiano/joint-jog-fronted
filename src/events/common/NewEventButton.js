import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Hidden } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';

import {EventStyles} from '../EventsStyles';

const NewEventButton = ({classes, toCreateNewEvent}) => {

    return(
        <Fragment>
            <Hidden mdUp>
                <Button 
                    variant="fab" 
                    color="primary" 
                    aria-label="add" 
                    className={classes.newEvent} 
                    onClick={toCreateNewEvent}
                >
                    <AddIcon/>
                </Button>
            </Hidden>
            <Hidden smDown>
                <Button 
                    variant="raised" 
                    color="primary" 
                    aria-label="add" 
                    className={classes.newEvent} 
                    onClick={toCreateNewEvent}
                >
                    Новая пробежка
                </Button>
            </Hidden>
        </Fragment>
    );
};

NewEventButton.propTypes = {
    toCreateNewEvent: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(EventStyles)(NewEventButton);
