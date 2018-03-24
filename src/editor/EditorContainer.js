import React, {Component, Fragment} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MapContainer from '../map/MapContainer';
import EventCreateForm from './EventCreateForm';
import EventEditForm from './EventEditForm';
import EditorModal from './EditorModal';
import HideEditorButton from './common/HideEditorButton';

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
                <MapContainer/>
                <HideEditorButton hideHandler={this.hideHandler} isHidden={!this.state.showModal}/>
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

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditorContainer));