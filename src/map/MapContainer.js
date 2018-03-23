import React, {Component} from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, Placemark }from 'react-yandex-maps';
import PropTypes from 'prop-types';
import * as actions from './MapActions';
import * as selectors from './MapSelectors';

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
    
    onClick(e) {
        console.log(e);
    }
    
    render() {
        return(
            <YMaps>
                <Map state={{center: this.props.basicGeo, zoom: 15, controls: []}}
                    onClick={this.onClick}
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
                        options={{
                            iconImageSize: [30, 42],
                            iconImageOffset: [-3, -42]
                        }}
                    />

                </Map>
            </YMaps>
        );
    }
}

const mapStateToProps = state => ({
    basicGeo: selectors.selectUserBasicGeo(state)
});

const mapDispatchToProps = {
    setUserBasicGeo: actions.setUserBasicGeo
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);