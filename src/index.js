import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet-fa-markers/L.Icon.FontAwesome.css'

import './index.css';
import './style/style.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
