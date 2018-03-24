export const CreateEventFormStyles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
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
        margin: 8
    },
    submitButton: {
        margin: 8        
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
    hideButton: {
        position: 'absolute',
        bottom: '25px',
        left: '25px',
        zIndex: 5        
    }
});