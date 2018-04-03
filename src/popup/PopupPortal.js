import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const PopupPortal = ({portalElementId, children}) => createPortal(
    <div>
        {children}
    </div>,
    document.getElementById(portalElementId)
);

PopupPortal.propTypes = {
    portalElementId: PropTypes.string,
    children: PropTypes.object.isRequired
};

PopupPortal.defaultProps = {
    portalElementId: 'popup'
};

export default PopupPortal;