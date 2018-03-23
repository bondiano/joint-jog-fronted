import { createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: indigo[200],
            main: indigo[500],
            dark: indigo[600],
            contrastText: grey[300],
        },
        secondary: {
            light: grey[200],
            main: grey[300],
            dark: grey[400],
            contrastText: '#fff',
        },
        error: red
    }
});

export default theme;