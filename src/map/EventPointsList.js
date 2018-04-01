import React, { PureComponent, Fragment } from 'react';
import { Placemark }from 'react-yandex-maps';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EventPointsList extends PureComponent {
    static propTypes = {
        pointsList: PropTypes.array.isRequired
    }

    render() {
        return (
            <Fragment>
            {this.props.pointsList.map((point, index) => 
                (<Placemark
                    geometry={{
                        coordinates: [point.latitude, point.longitude]
                    }}
                    properties={{
                        balloonContent: point.title && point.title,
                        iconContent: index + 1
                    }}
                    options={{
                        preset: 'islands#darkBlueIcon'
                    }}
                    key={point._id}
            />))}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    pointsList: state.map.currentEventPointsList    
});

export default connect(mapStateToProps, null)(EventPointsList);