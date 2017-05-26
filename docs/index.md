
# unpkg.com/getlibs 
## Modern javascript in static files. No server/build required.

`getlibs` is a pre-configured module loader which pulls external dependencies directly from CDN and transpiles your code on the fly. 
In other words, you can __write modern javascript__ (or typescript) and __use latest frameworks__/libraries without setting up a server 
or configuring a build script. Just use static files, open in a browser and hit refresh :-). 
You don't even need node/npm on your machine...

This will not work on production, so at some point it is still necessary to setup webpack/rollup/eslint/karma/whatever. 
But you can skip it when you are just starting, experimenting, sharing code, teaching or learning new stuff.

`getlibs` loader should be reasonably fast for dev workflows (it runs babel/typescript in a separate thread, caches transpiled code 
and allows preloading framework files). With good internet connection it should still be fast even when your project 
grows to a few hundred files. However the first run is always slow, so no production use.

## Installation

There is nothing to install, just include `getlibs` script in html -

```html
<script src="https://unpkg.com/getlibs"></script>
```
Usually, there is no need to include anything else, all other code will be imported on demand by the loader.

## Usage

Write javascript (or typescript) modules the same way as you would do for browserify/webpack/rollup bundlers. 

##### ES5/require()
```js
var compile = require('lodash/template'),
    template = require('./hello.tpl'),
    data = require('./hello.json'),
    render = compile(template);

document.getElementById('app').innerHTML = render(data);
```

##### ES6/import
```js
import React from 'react';
import ReactDOM from 'react-dom';
const msg = 'Hello World!';

ReactDOM.render(<h1>{msg}</h1>, document.getElementById('app'));
```

##### Typescript
```ts
import {Component} from '@angular/core';

@Component({
    selector: '#app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    msg = 'Hello World!';
}
```

Use `System.import()` in a script tag to load your code into the page.
```html
<script>
    System.import('./main.js');
</script>
```

## Examples

- Angular
- React
- Vue

## x-module tags

...

## How it works

...

## About

...
