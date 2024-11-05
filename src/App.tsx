import { ThemeProvider, useTheme } from '@emotion/react';
import './App.css'
import MainNavigator from "./router/MainNavigator";
import { CssBaseline } from '@mui/material';

function App() {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainNavigator />
    </ThemeProvider>
  )
}

export default App
