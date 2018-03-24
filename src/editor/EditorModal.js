import React, {Component} from 'react';
import { createPortal } from 'react-dom';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';

import { EditorModalStyles } from './EditorStyles';
const modalRoot = document.getElementById('modal');

class EditorModal extends Component {
    static propTypes ={
        classes: PropTypes.object.isRequired,
        children: PropTypes.object.isRequired
    }

    render() {
        return createPortal(
            <div className={this.props.classes.root}>
                {this.props.children}
            </div>,
            modalRoot
        );
    }
}

export default withStyles(EditorModalStyles)(EditorModal);