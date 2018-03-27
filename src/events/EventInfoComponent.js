import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import MapContainer from '../map/MapContainer';

class EventInfoComponent extends Component {

    render() {
        return (
            <MapContainer showOne/>
        );
    }
}

export default withRouter(EventInfoComponent);