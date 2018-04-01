import purple from 'material-ui/colors/purple';

export const EventStyles = theme => ({
    newEvent: {
        position: 'absolute',
        bottom: '25px',
        right: '25px',
        zIndex: 1
    }
});

export const EventInfoModalStyles = theme => ({
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
        display: 'flex',
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        right: 0,
        left: 'auto',
        height: '100%',
        overflowY: 'auto',
        flexDirection: 'column',
        backgroundColor: '#fff',
        boxShadow: '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)'
    },
    heading: {
        margin: '16px 8px 8px 8px',
        textAlign: 'center'
    },
    textLine: {
        margin: '4px 8px 4px 8px'
    },
    loader: {
        minWidth: 200,
        display: 'flex',
        justifyContent: 'center'
    },
    progress: {
        color: purple[500]
    },
    button: {
        margin: 4
    },
    wrapButton: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    fabProgress: {
        color: purple[500],
        position: 'absolute',
        top: 6,
        left: 48,
        zIndex: 1,
    },
    wrapper: {
        position: 'relative'
    }
});