import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fruits } from './Fruits';

const App = () => {
  return (
    <div>
      <Fruits />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
