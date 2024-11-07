import { ThemeProvider, useTheme } from '@emotion/react';
import './App.css'
import MainNavigator from "./router/MainNavigator";
import { CssBaseline } from '@mui/material';
import { ClientContextProvider } from './context/ClientContext';


function App() {
  const theme = useTheme();
  return (
    <ClientContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainNavigator />
      </ThemeProvider>
    </ClientContextProvider>
  )
}

export default App
