import React from 'react';
// import {render} from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';




const container = document.getElementById('app');

// render(<App/>, document.getElementById('app'));



const root = createRoot(container);
root.render(<App  />);