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
                    options={{
                        preset: 'islands#blueRunIcon'
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

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PointsShowList));