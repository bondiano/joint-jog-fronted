import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Hidden } from 'material-ui';
import { YMaps, Map, Placemark, ZoomControl, SearchControl }from 'react-yandex-maps';
import PropTypes from 'prop-types';
import * as actions from './MapActions';

class MapContainer extends Component {
    static propTypes = {
        userWhere: PropTypes.array.isRequired,
        setUserPosition: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.searchControl = null;
        this.mapControl = null;
    }
    
    componentDidMount() {
        if ("geolocation" in window.navigator) {
            window.navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                if (this.props.userWhere[0] === latitude) {
                    // Abort dispatch unnecessary action
                    return;
                }
                const longitude = position.coords.longitude;
                const accuracy = position.coords.accuracy;
                this.props.setUserPosition(latitude, longitude, accuracy);
            });
        } else {
            console.log('Cannot receive geoposition');
        }
    }

    setSearchControlRef = (ref) => {
        this.searchControl = ref;
    }

    setMapControlRef = (ref) => {
        this.mapControl = ref;
    }
    
    render() {
        return(
            <YMaps>
                <Map state={{center: [54.98, 82.89], zoom: 12, controls: []}}
                    width="100%"
                    height="100%"
                    instanceRef={this.setMapControlRef}
                    >
                    <Hidden smDown>
                        <SearchControl
                            instanceRef={this.setSearchControlRef}
                            options={searchControlOptions}
                        />
                        <ZoomControl options={zoomControlOptions} />
                    </Hidden>
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

const searchControlOptions = { 
    position: {
        top: '80px',
        left: '25px'
    },
    size: 'large',
    noPlacemark: true
};

const zoomControlOptions = {
    position: {
        top: '120px',
        left: '25px'
    },
};

const mapStateToProps = state => ({
    userWhere: [state.map.userWhere.latitude, state.map.userWhere.longitude]
});

const mapDispatchToProps = {
    setUserPosition: actions.setUserPosition
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);