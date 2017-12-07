import React from 'react';
import ReactDOM from 'react-dom';
import Series from './components/Series';

ReactDOM.render(
    <Series />, 
    document.getElementById('myCarousel')
);

if (module.hot != undefined) module.hot.accept();

