import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, AppBar, Toolbar, Typography, Button } from 'material-ui';

import {NavbarStyles} from '../AppStyles';

function Navbar({/* isAuth, logout, toProfile, */ toLogin,  toMap, classes}) {
    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Joint Jog
                </Typography>
                <Button color="secondary" onClick={toMap}>
                    Карта
                </Button>
                <Button color="secondary" onClick={toLogin}>
                    Войти
                </Button>
            </Toolbar>
        </AppBar>
    </div>
    );
}

Navbar.propTypes = {
    toLogin: PropTypes.func.isRequired,
    toMap: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(NavbarStyles)(Navbar);