import React from 'react';
import asPopup from './asPopup';

function Notification() {
    return (
        <div>
            Some notification
        </div>
    );
}

export default asPopup()(Notification);