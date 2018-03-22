import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './common/Navbar';

// import PrivateRoute from './common/PrivateRouter';

class App extends React.Component {

    render() {
        return (
            <Fragment>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Navbar} />
                    <Route path="/login" component={Navbar} />
                    {/*<Route exact path="/" component={Homepage}/>*/}
                    {/*<PrivateRoute*/}
                        {/*isAuth={this.props.isAuth}*/}
                        {/*exact*/}
                        {/*path="/"*/}
                        {/*component={}*/}
                    {/*/>*/}
                    {/*<PrivateRoute*/}
                        {/*isAuth={this.props.isAuth}*/}
                        {/*path="/"*/}
                        {/*component={}*/}
                    {/*/>*/}
                </Switch>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
