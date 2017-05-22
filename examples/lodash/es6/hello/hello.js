
import compile from 'lodash/template';
import template from './hello.tpl';
import data from './hello.json';

let render = compile(template);

document.getElementById('app').innerHTML = render(data);
