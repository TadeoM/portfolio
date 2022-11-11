import {loadImages} from './loader.js';

window.onload = loadImages;

//runs in this order
//init.js -> loader.js [loadImages function] -> main.js [init function] -> everything else