import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#000',
      main:'#000',
      dark: '#fff'
    },
    secondary: {
      light: '#fff',
      main:'#fff',
      dark: '#000'
    },
    type: 'dark'
  }
});

export default Theme;
