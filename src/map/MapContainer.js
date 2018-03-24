import React, {Component} from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, Placemark }from 'react-yandex-maps';
import PropTypes from 'prop-types';
import * as actions from './MapActions';

class MapContainer extends Component {
    static propTypes = {
        basicGeo: PropTypes.array.isRequired,
        setUserBasicGeo: PropTypes.func.isRequired
    }
    
    componentDidMount() {
        if ("geolocation" in window.navigator) {
            window.navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.props.setUserBasicGeo(latitude, longitude);
            });
        } else {
            console.log('Cannot receive geoposition');
        }
    }
    
    render() {
        return(
            <YMaps>
                <Map state={{center: this.props.basicGeo, zoom: 15, controls: []}}
                    width="100%"
                    height="100%">

                    <Placemark
                        geometry={{
                            coordinates: this.props.basicGeo
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
    basicGeo: [state.map.basicGeo.latitude, state.map.basicGeo.longitude]
});

const mapDispatchToProps = {
    setUserBasicGeo: actions.setUserBasicGeo
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);