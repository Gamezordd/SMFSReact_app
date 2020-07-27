import React from 'react';
import {Main} from './Components'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}

export default App;
