import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D4AF37', // luxury gold
      contrastText: '#000000',
      light: '#f5d76e',
      dark: '#f8c059',
    },
    secondary: {
      main: '#e3e3e3', // platinum
      contrastText: '#000000',
      light: '#FFFFFF',
      dark: '#999999',
    },
    background: {
      default: '#000000', // black
      paper: '#1a1a1a', // charcoal
    },
    text: {
      primary: '#FFFFFF', // white
      secondary: '#e3e3e3', // platinum
    },
    common: {
      black: '#000000',
      white: '#FFFFFF'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    }
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    h5: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
      letterSpacing: '0.08em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '12px 28px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(145deg, #f5d76e, #f8c059)',
          color: '#000000',
          border: '1px solid #D4AF37',
          '&:hover': {
            background: '#FFFFFF',
            color: '#000000',
          },
        },
        outlined: {
          borderColor: '#D4AF37',
          color: '#D4AF37',
          '&:hover': {
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            borderColor: '#D4AF37',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(212, 175, 55, 0.2)',
            transform: 'translateY(-4px)',
            borderColor: '#D4AF37',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
          letterSpacing: '0.05em',
        },
      },
    },
  },
});

export default theme;