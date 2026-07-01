import React from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import './pages/optin.css';
import body from './pages/optin.body.html?raw';
import { run } from './pages/optin.logic.js';
import Page from './Page.jsx';

createRoot(document.getElementById('root')).render(<Page html={body} run={run} />);
