import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, AppBar, Toolbar, Typography, Button } from 'material-ui';

const styles = theme => ({
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

function Navbar({isAuth, logout, toLogin, toProfile, toMap, classes}) {
    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Joint Jog
                </Typography>
                <Button color="secondary">Войти</Button>
            </Toolbar>
        </AppBar>
    </div>
    );
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);