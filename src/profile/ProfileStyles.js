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
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            width: 700,
        },
        [theme.breakpoints.down('sm')]: {
            width: 300,
        },
    },
    rootInfo: {
        marginTop: 90,
        [theme.breakpoints.up('md')]: {
            width: 700,
            textAlign: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            width: 300,
        },
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
        [theme.breakpoints.up('md')]: {
            width: 700,
        },
        [theme.breakpoints.down('sm')]: {
            width: 300,
        },

    },
    fabProgress: {
        marginTop: 90,
    },
    cell: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: 50
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 5
        },

    }
});
