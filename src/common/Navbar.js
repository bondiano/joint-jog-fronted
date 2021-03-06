import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles, AppBar, Toolbar, Typography, Button, Hidden } from 'material-ui';
import { logo } from '../assets';
import { NavbarStyles } from './CommonStyles';

function Navbar({isAuth, logout, toProfile, toLogin, toCreateNewEvent, toMap, classes}) {
    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <div className={classes.flex}>
                <Link to="/">
                    <img src={logo} alt="Logo" className={classes.logo}/>
                </Link>
                <Hidden xsDown>
                    <Typography variant="title" color="inherit" className={classes.title}>
                        Joint Jog
                    </Typography>
                </Hidden>
                </div>
                <Button color="inherit" onClick={toMap}>
                    Карта
                </Button>
                {isAuth ?
                    <Fragment>
                        <Hidden smDown>
                            <Button color="inherit" onClick={toCreateNewEvent}>
                                Новая пробежка
                            </Button>
                        </Hidden>
                        <Button color="inherit" onClick={toProfile}>
                            Профиль
                        </Button>
                        <Button color="inherit" onClick={logout}>
                            Выйти
                        </Button>
                    </Fragment> : 
                    <Button color="inherit" onClick={toLogin}>
                        Войти
                    </Button>
                }
            </Toolbar>
        </AppBar>
    </div>
    );
}

Navbar.propTypes = {
    toProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired,
    toLogin: PropTypes.func.isRequired,
    toCreateNewEvent: PropTypes.func.isRequired,
    toMap: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(NavbarStyles)(Navbar);