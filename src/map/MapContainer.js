import React, {Component} from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, Placemark }from 'react-yandex-maps';
import PropTypes from 'prop-types';
import * as actions from './MapActions';

class MapContainer extends Component {
    static propTypes = {
        userWhere: PropTypes.array.isRequired,
        setUserPosition: PropTypes.func.isRequired
    }
    
    componentDidMount() {
        if ("geolocation" in window.navigator) {
            window.navigator.geolocation.getCurrentPosition(position => {
                console.log(position);
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const accuracy = position.coords.accuracy;
                this.props.setUserPosition(latitude, longitude, accuracy);
            });
        } else {
            console.log('Cannot receive geoposition');
        }
    }
    
    render() {
        return(
            <YMaps>
                <Map state={{center: [54.98, 82.89], zoom: 12, controls: []}}
                    width="100%"
                    height="100%">

                    <Placemark
                        geometry={{
                            coordinates: this.props.userWhere
                        }}
                        properties={{
                            hintContent: 'Вы тут',
                            balloonContent: 'Вы тут, примерно :)'
                        }}
                    />

                </Map>
            </YMaps>
        );
    }
}

const mapStateToProps = state => ({
    userWhere: [state.map.userWhere.latitude, state.map.userWhere.longitude]
});

const mapDispatchToProps = {
    setUserPosition: actions.setUserPosition
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);