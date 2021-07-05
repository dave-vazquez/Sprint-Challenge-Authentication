import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './components/DesignComponents/theme';
import GlobalStyles from './components/DesignComponents/GlobalStyles';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyles />
      <Route path='/' component={App} />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);
