import purple from 'material-ui/colors/purple';

export const CreateEventFormStyles = theme => ({
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
    fieldLine: {
        margin: '4px 12px 4px 12px'
    },
    heading: {
        margin: '16px 8px 8px 8px'
    },
    submitButton: {
        margin: 8        
    },
    fabProgress: {
        color: purple[500],
        position: 'absolute',
        top: 10,
        left: 50,
        zIndex: 1,
    },
    wrapper: {
        position: 'relative'
    },
    buttonsWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    routeButton: {
        display: 'flex',
        marginLeft: 8
    }
});

export const EditorModalStyles = thene => ({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
        display: 'flex',
    },
    heading: {
        margin: '0px 8px 8px 8px'
    },
    pointsListContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    pointEdit: {
        display: 'flex',
        width: '100%',
        padding: '0px 8px 0px 8px'
    },
    pointButton: {
        minWidth: 32
    }
});