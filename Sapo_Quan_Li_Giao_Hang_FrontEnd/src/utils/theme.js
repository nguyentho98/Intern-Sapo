import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  color: {
    primary: '#1976d2',
    secondary: '#E040FB',
    error: '#FF5722',
    textColor: '#FFFFFF',
    defaultTextColor: '#000000',
    hover: 'rgba(0,0,0,0.08)',
  },
  typography: {
    fontFamily: 'Roboto',
  },
  overrides: {
    '& label':{
      color: '#000'
    }
  },
});
export default theme;
