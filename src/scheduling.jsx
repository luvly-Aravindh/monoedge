import React from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import './pages/scheduling.css';
import body from './pages/scheduling.body.html?raw';
import { run } from './pages/scheduling.logic.js';
import Page from './Page.jsx';

// Warm up the Calendly connection and assets as early as possible so the inline
// scheduler appears much faster. This only adds resource hints, the calendar
// itself and its appearance are unchanged.
(function preconnectCalendly() {
  var links = [
    { rel: 'preconnect', href: 'https://assets.calendly.com' },
    { rel: 'preconnect', href: 'https://calendly.com' },
    { rel: 'preload', as: 'style', href: 'https://assets.calendly.com/assets/external/widget.css' },
    { rel: 'preload', as: 'script', href: 'https://assets.calendly.com/assets/external/widget.js' },
  ];
  for (var i = 0; i < links.length; i++) {
    var d = links[i];
    var l = document.createElement('link');
    l.rel = d.rel;
    l.href = d.href;
    if (d.as) l.as = d.as;
    document.head.appendChild(l);
  }
})();

createRoot(document.getElementById('root')).render(<Page html={body} run={run} />);
