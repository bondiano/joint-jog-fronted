import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Placemark }from 'react-yandex-maps';

class PointsShowList extends PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
        pointsList: PropTypes.array.isRequired
    }

    setPlacemarkRef = (id) => (ref) => {
        this[`placeMarkRef${id}`] = ref;
        ref && ref.events.add('click', (event) => {
            this.props.history.push(`/event/${id}`);
        });
    }

    render() {
        return (
            <Fragment>
            {this.props.pointsList.map((point, index) => {
                return (
                <Placemark
                    key={point.id}
                    geometry={{
                        coordinates:  [point.latitude, point.longitude]
                    }}
                    properties={{
                        balloonContent: point.title && point.title,
                        iconContent: index + 1
                    }}
                    options={{
                        preset: 'islands#darkBlueRunIcon'
                    }}
                    instanceRef = {this.setPlacemarkRef(point.id)}
                />);
            })}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    pointsList: state.map.pointsList
});


export default withRouter(connect(mapStateToProps, null)(PointsShowList));