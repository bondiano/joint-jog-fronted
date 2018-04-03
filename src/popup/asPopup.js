import React,{ Component } from 'react';
import { connect } from 'react-redux';

const asPopup = (types = [], options = { hideAfter: 4000, type: 'notification', maxCount: 3 }) => {

    return (WrappedComponent) => {
        const mapStateToProps = (state) => ({
        });
        
        const mapDispatchToProps = {
        };

        return connect(mapStateToProps, mapDispatchToProps)(class HOC extends Component {
            render() {
                return (
                    <WrappedComponent popup={{hide: false, action: () => {}}} {...this.props}/>
                );
            }
        });
    };
};

export default asPopup;