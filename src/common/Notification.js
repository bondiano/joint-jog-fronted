import React from 'react';
import asPopup from '../popup/asPopup';

const Notification = ({popup: {hide, action}}) => {
    return (
        <div>
            Some notification
        </div>
    );
};

export default asPopup()(Notification);