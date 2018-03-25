import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Placemark }from 'react-yandex-maps';

// import * as actions from './MapActions';

class PointsEditList extends Component {
    static propTypes = {
        editorPointsList: PropTypes.array.isRequired
    }

    render() {
        return (
            <Fragment>
                {this.props.editorPointsList.map((point, index) => {
                    console.log('point', index, point);
                        return (<Placemark
                            key={index}
                            geometry={{
                                coordinates:  [point.latitude, point.longitude]
                            }}
                            properties={{
                                hintContent: 'PointsEditList'
                            }}
                            options={{
                                preset: 'islands#blueRunIcon'
                            }}
                        />);
                    })
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    editorPointsList: state.map.editorPointsList
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PointsEditList);