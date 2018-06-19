import React from 'react';
import { render } from 'react-dom';

import App from './App';
import './styles/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.css';

// import './styles/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

function InitApp() {
  render(<App />, document.getElementById('root'));
  registerServiceWorker();
}

// Fix INTL for old Browsers
// "The Intl APIs are currently available on all modern browsers except Safari"
// https://github.com/andyearnshaw/Intl.js
if (!global.Intl) {
  require.ensure(
    ['intl', 'intl/locale-data/jsonp/en.js', 'intl/locale-data/jsonp/es.js'],
    function(require) {
      require('intl');
      require('intl/locale-data/jsonp/en.js');
      require('intl/locale-data/jsonp/es.js');

      InitApp();
    }
  );
} else {
  InitApp();
}
