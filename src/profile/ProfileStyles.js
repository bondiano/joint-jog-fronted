export const ProfileStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        height: '100%',
        overflowX: 'auto',
        alignItems: 'center'
    },
    rootEditor: {
        marginTop: 90,
        textAlign: 'center',
        minWidth: 250,
    },
    rootInfo: {
        marginTop: 90,
        minWidth: 250,
    },
    heading: {
        margin: 8,
        align: 'center'
    },
    fieldLine: {
        margin: 8
    },
    buttonLine:{
        margin: 16
    },
    icon: {
        marginTop: 10,
        marginLeft: 10
    },
    error: {
        color: 'red',
    },
    rootTable: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        textAlign: 'center',
    },
    fabProgress: {
        marginTop: 90,
    }
});
