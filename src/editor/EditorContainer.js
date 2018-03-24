import React, {Component, Fragment} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MapContainer from '../map/MapContainer';
import EventCreateForm from './EventCreateForm';
import EventEditForm from './EventEditForm';
import EditorModal from './EditorModal';
class EditorContainer extends Component {

    render() {
        return(
            <Fragment>
                <MapContainer/>
                <EditorModal>
                    <Switch>
                        <Route exact path="/editor/create" component={EventCreateForm}/>
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