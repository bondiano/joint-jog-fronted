import React from 'react';
import asPopup from '../popup/asPopup';

const ErrorNotification = ({popup: {hide, action}}) => {
    return (
        <div>
            Some ErrorNotification
        </div>
    );
};

export default asPopup()(ErrorNotification);