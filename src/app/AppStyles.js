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
        zIndex: 1
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
});