import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#000',
      main: '#000',
      dark: '#000'
    },
    secondary: {
      light: '#fff',
      main:'#fff',
      dark: '#fff'
    },
    amber: {
      light: '#9575cd',
      main: '#9575cd',
      dark: '#9575cd'
    },
    type: 'light'
  }
});

export default Theme;
