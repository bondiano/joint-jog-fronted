import React, {Component, Fragment} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import MapContainer from '../map/MapContainer';
import EventCreateForm from './EventCreateForm';
import EventEditForm from './EventEditForm';
import EditorModal from './EditorModal';
import HideModalButton from '../app/common/HideModalButton';

class EditorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        };
    }

    hideHandler = () => {
        this.setState({
            ...this.state,
            showModal: !this.state.showModal
        });
    }

    render() {
        return(
            <Fragment>
                <MapContainer editorMode/>
                <HideModalButton hideHandler={this.hideHandler} isHidden={!this.state.showModal}/>
                <EditorModal>
                    <Switch>
                        <Route exact path="/editor/create" render={() => <EventCreateForm showEditor={this.state.showModal}/>}/>
                        <Route path="/editor/:id" component={EventEditForm}/>
                    </Switch>
                </EditorModal>
            </Fragment>
        );
    }
}

export default withRouter(EditorContainer);