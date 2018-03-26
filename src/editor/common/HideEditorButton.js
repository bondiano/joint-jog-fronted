import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Hidden } from 'material-ui';
import {EditorModalStyles} from '../EditorStyles';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const HideEditorButton = ({hideHandler, isHidden, classes}) => {
    return (
        <Fragment>
            <Hidden mdUp>
                <Button 
                    variant="fab" 
                    color="primary" 
                    aria-label="add" 
                    className={classes.hideButton} 
                    onClick={hideHandler}
                >
                {isHidden ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </Button>
            </Hidden>
            <Hidden smDown>
                <Button 
                    onClick={hideHandler} 
                    className={classes.hideButton} 
                    variant="raised" 
                    color="primary" 
                    aria-label="add"
                >
                    {isHidden ? 'Открыть редактор' : 'Скрыть редактор'}
                </Button>
            </Hidden>
        </Fragment>
    );
};

HideEditorButton.propTypes = {
    isHidden: PropTypes.bool.isRequired,
    hideHandler: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(EditorModalStyles)(HideEditorButton);