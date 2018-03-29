import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Hidden } from 'material-ui';
import { YMaps, Map, Placemark, ZoomControl, SearchControl }from 'react-yandex-maps';
import PropTypes from 'prop-types';

import * as actions from './MapActions';

import PointsShowList from './PointsShowList';
import PointsEditorList from './PointsEditList';

class MapContainer extends Component {
    static propTypes = {
        editorMode: PropTypes.bool,
        showRoute: PropTypes.bool.isRequired,
        userWhere: PropTypes.array.isRequired,
        editorPointsList: PropTypes.array.isRequired,
        currentMap: PropTypes.object.isRequired,
        setCurrentMapInfo: PropTypes.func.isRequired,
        setUserPosition: PropTypes.func.isRequired
    }

    static defaultProps = {
        editorMode: false
    }

    constructor(props) {
        super(props);

        this.ymaps = null;
        this.route = null;
        this.searchControl = null;
        this.mapControl = null;
    }

    componentDidMount() {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                if (this.props.userWhere[0] === latitude) {
                    // Abort dispatch unnecessary action
                    return;
                }
                const longitude = position.coords.longitude;
                const accuracy = position.coords.accuracy;
                this.props.setUserPosition(latitude, longitude, accuracy);
            }, (err) => {
                console.log('Cannot receive geoposition');
            }, {enableHighAccuracy:true});
        } else {
            console.log('Cannot receive geoposition');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.showRoute !== nextProps.showRoute) {
            if(nextProps.showRoute) {
                this.showRoute();
            } else {
                this.hideRoute();
            }
        }
    }

    componentWillUnmount() {
        this.removeMapEventListeners();
    }

    setSearchControlRef = (ref) => {
        this.searchControl = ref;
    }

    setMapControlRef = (ref) => {
        this.mapControl = ref;
        this.addMapEventListeners();
    }

    showRoute() {
        this.route = new this.ymaps.multiRouter.MultiRoute({
            referencePoints: this.props.editorPointsList.map((el) => [el.latitude, el.longitude]),
            params: {
                routingMode: 'pedestrian',
                results: 1
            }
        },{
            editorDrawOver: false,
            routeStrokeColor: "000088",
            routeActiveStrokeColor: "ff0000",
            pinIconFillColor: "ff0000",
            boundsAutoApply: true,
            zoomMargin: 30
        });
        this.mapControl.geoObjects.add(this.route);
    }

    hideRoute() {
        this.mapControl && this.mapControl.geoObjects.remove(this.route);
    }
    
    addMapEventListeners() {
        if(!this.mapControl) {
            return;
        }

        this.mapControl.events.add('boundschange', (event) => {
            const center = event.get('newCenter');
            const zoom = event.get('newZoom');
            if (center[0] !== this.props.currentMap.center[0] 
            && center[1] !== this.props.currentMap.center[1]) {
                this.props.setCurrentMapInfo(center, zoom);
            }
        });
    }

    removeMapEventListeners() {
        if(!this.mapControl) {
            return;
        }

        this.mapControl.events.remove('actionend');
    }

    onApiAvaliable(ymaps) {
        this.ymaps = ymaps;
    }

    render() {
        return(
            <YMaps onApiAvaliable={(ymaps) => this.onApiAvaliable(ymaps)}>
                <Map state={
                    {
                        center: this.props.currentMap.center, 
                        zoom: this.props.currentMap.zoom, 
                        controls: []
                    }}
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
                            hintContent: 'Вы тут'
                        }}
                        options={{
                            preset: 'islands#blueRunCircleIcon'
                        }}
                    />
                    {this.props.editorMode ? <PointsEditorList/> : <PointsShowList/>}
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
    editorPointsList: state.map.editorPointsList,    
    currentMap: state.map.currentMap,
    showRoute: state.map.showRoute,
    userWhere: [state.map.userWhere.latitude, state.map.userWhere.longitude]
});

const mapDispatchToProps = {
    setUserPosition: actions.setUserPosition,
    setCurrentMapInfo: actions.setCurrentMapInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);