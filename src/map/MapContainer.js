import React, {Component, Fragment} from 'react';

import { YMaps, Map, Placemark, GeoObject }from 'react-yandex-maps';
const mapState = { center: [54.98, 82.89], zoom: 15 };
class MapContainer extends Component {

    onGeometryChange(e) {
        console.log(e);
    }

    render() {
        return(
            <YMaps>
                <Map state={mapState}
                     onClick={this.onGeometryChange}>

                    <Placemark
                        geometry={{
                            coordinates: [55.751574, 37.573856]
                        }}
                        properties={{
                            hintContent: 'Собственный значок метки',
                            balloonContent: 'Это красивая метка'
                        }}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: 'images/myIcon.gif',
                            iconImageSize: [30, 42],
                            iconImageOffset: [-3, -42]
                        }}
                    />

                    <GeoObject
                        // The geometry description.
                        geometry={{
                            type: 'Point',
                            coordinates: [55.8, 37.8],
                        }}
                        // Properties.
                        properties={{
                            // The placemark content.
                            iconContent: 'Я тащусь',
                            hintContent: 'Ну давай уже тащи',
                        }}
                        // Options.
                        options={{
                            // The placemark's icon will stretch to fit its contents.
                            preset: 'islands#blackStretchyIcon',
                            // The placemark can be moved.
                            draggable: true,
                        }}
                    />

                </Map>
            </YMaps>
        );
    }
}

export default MapContainer;