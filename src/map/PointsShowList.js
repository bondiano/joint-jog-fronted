import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Placemark }from 'react-yandex-maps';

class PointsShowList extends PureComponent {
    static propTypes = {
        pointsList: PropTypes.array.isRequired
    }

    setPlacemarkRef = index => ref => {
        this[`placeMarkRef${index}`] = ref;
    }

    render() {
        return (
            <Fragment>
            {this.props.pointsList.map((point) => {
                return (
                <Placemark
                    key={point.id}
                    geometry={{
                        coordinates:  [point.latitude, point.longitude]
                    }}
                    properties={{
                        balloonContent: point.title
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

export default connect(mapStateToProps, mapDispatchToProps)(PointsShowList);