import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';

import HideModalButton from '../common/HideModalButton';
import MapContainer from '../map/MapContainer';
import EventInfoModal from './EventInfoModal';

class EventInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        };
    }

    hideHandler = () => {
        this.setState({
            ...this.state,
            showModal: !this.state.showModal
        });
    }
    
    render() {
        return (
            <Fragment>
                <MapContainer showOne/>
                <HideModalButton hideHandler={this.hideHandler} isHidden={!this.state.showModal}/>                
                <EventInfoModal showEditor={this.state.showModal}/>
            </Fragment>
        );
    }
}

export default withRouter(EventInfoComponent);