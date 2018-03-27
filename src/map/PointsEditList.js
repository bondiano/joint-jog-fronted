import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Placemark }from 'react-yandex-maps';

import * as actions from './MapActions';

class PointsEditList extends PureComponent {
    static propTypes = {
        editorPointsList: PropTypes.array.isRequired,
        changePointPosition: PropTypes.func.isRequired
    }

    setPlacemarkRef = index => ref => {
        this[`placeMarkRef${index}`] = ref;
    }

    handleDrag = (point, index) => event => {
        const [latitude, longitude] = this[`placeMarkRef${index}`].geometry.getCoordinates();
        this.props.changePointPosition(index, latitude, longitude);
    }

    render() {
        return (
            <Fragment>
                {this.props.editorPointsList.map((point, index) => {
                    return (
                    <Placemark
                        key={index}
                        geometry={{
                            coordinates:  [point.latitude, point.longitude]
                        }}
                        properties={{
                            hintContent: 'Перетащите на нужное место',
                            balloonContent: point.title && point.title
                        }}
                        options={{
                            preset: point.selected ? 'islands#redRunIcon' : 'islands#blueRunIcon',
                            draggable: true
                        }}
                        onDragEnd = {this.handleDrag(point, index)}
                        instanceRef = {this.setPlacemarkRef(index)}
                    />);
                })}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    editorPointsList: state.map.editorPointsList
});

const mapDispatchToProps = {
    changePointPosition: actions.changePointPosition
};

export default connect(mapStateToProps, mapDispatchToProps)(PointsEditList);