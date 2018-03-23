import React, {Component} from 'react';

import { YMaps, Map, Placemark, GeoObject }from 'react-yandex-maps';

class MapContainer extends Component {

    onClick(e) {
        console.log(e);
    }

    getUserCurrentPosition() {
        if ("geolocation" in window.navigator) {
            window.navigator.geolocation.getCurrentPosition(pos => console.log(pos));
          } else {
            /* geolocation IS NOT available */
          }
    }

    render() {
        return(
            <YMaps>
                <Map state={{center: [54.98, 82.89], zoom: 15, controls: []}}
                    onClick={this.onClick}
                    width="100%"
                    height="100%">

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
                        geometry={{
                            type: 'Point',
                            coordinates: [54.98, 82.89],
                        }}
                        properties={{
                            iconContent: 'Я тащусь',
                            hintContent: 'Ну давай уже тащи',
                        }}
                        options={{
                            preset: 'islands#blackStretchyIcon',
                            draggable: true,
                        }}
                    />

                </Map>
            </YMaps>
        );
    }
}

export default MapContainer;