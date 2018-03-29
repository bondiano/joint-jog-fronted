import React, {Component} from 'react';
import { Placemark }from 'react-yandex-maps';

class PointsShowList extends Component {
    render() {
        return (
            <Placemark
                geometry={{
                    coordinates:  [54.98, 83]
                }}
                properties={{
                    hintContent: 'PointsShowList'
                }}
                options={{
                    preset: 'islands#blueRunIcon'
                }}
            />
        );
    }
}

export default PointsShowList;