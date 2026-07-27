import React from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import './pages/thankyou.css';
import rawBody from './pages/thankyou.body.html?raw';
import { run } from './pages/thankyou.logic.js';
import Page from './Page.jsx';

import bbLogo from '../public/img/bb-logo.webp';

const body = rawBody.split('src="/img/bb-logo.png"').join(`src="${bbLogo}"`);

createRoot(document.getElementById('root')).render(<Page html={body} run={run} />);
