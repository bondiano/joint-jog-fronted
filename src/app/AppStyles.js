export const AppStyles= theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'
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