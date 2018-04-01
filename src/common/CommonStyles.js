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
        marginLeft: '5px'
    }
});