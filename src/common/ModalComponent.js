import React, {Component} from 'react';
import { createPortal } from 'react-dom';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';

import { ModalStyles } from './CommonStyles';
const modalRoot = document.getElementById('modal');

class ModalComponent extends Component {
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

export default withStyles(ModalStyles)(ModalComponent);