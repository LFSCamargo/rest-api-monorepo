import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import Router from './router/Router';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i');
  @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  body {
    font-family: 'Rubik', sans-serif;
    margin: 0px;
  }
`;

const Theme = {
  body: 'rgb(13, 23, 29)',
  header: '#1c2938',
  primary: '#1e74ff',
};

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <Provider store={store}>
      <>
        <GlobalStyle />
        <Router />
      </>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
