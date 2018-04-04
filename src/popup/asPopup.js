import React,{ Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from './PopupActions';

const asPopup = (types = [], options = { hideAfter: 4000, type: 'notification', maxCount: 3 }) => {
    return (WrappedComponent) => {
        const mapStateToProps = (state) => ({
            notifications: state.popup.notifications
        });
        
        const mapDispatchToProps = {
            listen: actions.listen,
            unlisten: actions.unlisten,
            hide: actions.hide
        };

        return connect(mapStateToProps, mapDispatchToProps)(class HOC extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    popupsQueue: []
                };
            }

            componentDidMount() {
                this.props.listen(types, options.type);
            }

            componentWillUnmount() {
                this.props.unlisten(types, options.type);
            }

            hide = (actionType) => (e) => {
                this.props.hide(actionType);
            }

            render() {
                return (
                    <Fragment>
                        {this.state.popupsQueue.map((notification, index) => (
                            <WrappedComponent 
                                key={`${notification.actionType}_${index}`}
                                popup={{
                                    hide: this.hide(notification.actionType), 
                                    show: true, 
                                    action: notification.action}} 
                                    {...this.props}
                                />
                        ))}
                    </Fragment>
                );
            }
        });
    };
};

export default asPopup;