import { createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: indigo[200],
            main: indigo[500],
            dark: indigo[600],
            contrastText: '#fff',
        },
        secondary: {
            light: purple[200],
            main: purple[300],
            dark: purple[400],
            contrastText: '#fff',
        },
        error: red
    }
});

export default theme;