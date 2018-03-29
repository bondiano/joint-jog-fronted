import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MapContainer from '../map/MapContainer';
import NewEventButton from './NewEventButton';

class EventsContainer extends Component {
    static propTypes = {
        isAuth: PropTypes.bool.isRequired,        
        history: PropTypes.object.isRequired
    }

    toCreateNewEvent = () => {
        this.props.history.push('/editor/create');
    }

    render() {
        return(
            <Fragment>
                <MapContainer/>
                {this.props.isAuth && <NewEventButton toCreateNewEvent={this.toCreateNewEvent}/>}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsContainer));