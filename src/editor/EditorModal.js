import React, {Component} from 'react';
import { createPortal } from 'react-dom';
import { withStyles, Button } from 'material-ui';
import PropTypes from 'prop-types';
import CloseIcon from 'material-ui-icons/Close';

import { EditorModalStyles } from './EditorStyles';
const modalRoot = document.getElementById('modal');

class EditorModal extends Component {
    static propTypes ={
        classes: PropTypes.object.isRequired,
        children: PropTypes.object.isRequired
    }

    render() {
        return createPortal(
            <aside className={this.props.classes.root}>
                    {this.props.children}
            </aside>,
            modalRoot
        );
    }
}

export default withStyles(EditorModalStyles)(EditorModal);