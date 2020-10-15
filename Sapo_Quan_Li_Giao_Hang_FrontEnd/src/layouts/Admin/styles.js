import {
  drawerWidth,
  drawerMiniWidth,
  transition,
  containerFluid,
} from './../../assets/jss/main';

const appStyle = (theme) => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
    '&:after': {
      display: 'table',
      clear: 'both',
      content: '" "',
    },
  },
  mainPanel: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
  },
  content: {
    marginTop: '50px',
    padding: '10px 15px',
    minHeight: 'calc(100vh - 123px)',
  },
  container: { ...containerFluid },
  map: {
    marginTop: '50px',
  },
  mainPanelSidebarMini: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerMiniWidth}px)`,
    },
  },
});

export default appStyle;
