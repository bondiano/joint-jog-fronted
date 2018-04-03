import React from 'react';
import { connect } from 'react-redux';

const asPopup = (types, options = {portalElementId: 'popup', hideAfter: 4000, maxCount: 3}) => {

    return (WrappedComponent) => {
        const mapStateToProps = (state) => ({
        });
        
        const mapDispatchToProps = {
        };

        return connect(mapStateToProps, mapDispatchToProps)(class extends React {
            constructor(props) {
                super(props);
            }

            render() {
                return (
                    <WrappedComponent {...this.props}/>
                );
            }
        });
    };
};

export default asPopup;