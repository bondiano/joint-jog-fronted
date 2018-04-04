import purple from 'material-ui/colors/purple';

export const HideButtonStyles = themes => ({
    hideButton: {
        position: 'absolute',
        bottom: '25px',
        left: '25px',
        zIndex: 5        
    }
});

export const ModalStyles = thene => ({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
        display: 'flex',
    }
});

export const NavbarStyles = theme => ({
    root: {
        position: 'fixed',
        width: '100%',
        display: 'flex',
        zIndex: 1
    },
    flex: {
        display: 'flex',
        flex: 1,
        alignItems: 'center'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    logo: {
        height: '45px'
    },
    title: {
        display: 'inline',
        marginLeft: '5px',
        letterSpacing: '-0.5px'
    }
});

export const PreloaderStyles = theme => ({
    heading: {
        margin: '16px 8px 8px 8px',
        textAlign: 'center'
    },
    loader: {
        minWidth: 200,
        display: 'flex',
        justifyContent: 'center'
    },
    progress: {
        color: purple[500]
    },
});

export const NotificationStyles = theme => ({
    error: {
        minWidth: 320,
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 1000,
        padding: '24px',
        borderLeft: '2px',
        borderLeftStyle: 'solid',
        borderColor: purple[500]
    },
    errorMessage: {
        display: 'flex',
        alignItems: 'center' 
    },
    errorIcon: {
        marginRight: '3px'
    }
});