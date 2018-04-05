import purple from 'material-ui/colors/purple';
export const AuthStyles = theme => ({
    container: {
        textAlign: 'center',
        minWidth: 300,
        textAlign: 'center',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardHeading: {
        margin: 8
    },
    fieldLine: {
        margin: 8,
        width: 250,
    },
    buttonLine:{
        margin: 16
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center   '
    },
    error: {
        color: 'red',
    },
    fabProgress: {
        color: purple[500],
        position: 'absolute',
        top: 17,
        left: 42,
        zIndex: 1,
    },
    wrapper: {
        position: 'relative'
    },
    buttonsWrapper: {
        display: 'flex',
        flexDirection: 'row'
    }
});
