import React from 'react';
import { withStyles } from 'material-ui';

const styles = {
    navbar: {
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: 'white',
        zIndex: 1
    }
};

function Navbar({classes}) {
    return (
      <div className={classes.navbar}>
          <p>navbar</p>
      </div>
    );
}

export default withStyles(styles)(Navbar);