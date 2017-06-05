
[![ActiveWidgets](http://www.activewidgets.com/include/logo/aw-logo-40.png?getlibs-readme)](http://www.activewidgets.com/)

An in-browser [module loader](https://github.com/systemjs/systemjs) configured to get external dependencies directly from CDN. Includes babel/typescript. For quick prototyping, code sharing, teaching/learning - a super simple web dev environment without node/webpack/etc. 

![Code preview](http://getlibs.com/code.gif)

## All front-end libraries

Angular, React, Vue, Bootstrap, Handlebars, jQuery are included. Plus all packages from [cdnjs.com](https://cdnjs.com/) and all of NPM (via [unpkg.com](https://unpkg.com/)). Most front-end libraries should work out of the box - just use `import`/`require()`. If a popular library does not load, tell us and we'll try to solve it with some library-specific config.

## Write modern javascript (or typescript)

Use latest language features or JSX and the code will be transpiled in-browser via babel or typescript (if required). To make it fast the transpiler will start in a worker thread and only process the modified code. Unless you change many files at once or open the project for the first time, the transpiling should be barely noticeable as it runs in parallel with loading and initializing the UI framework.

## No server/build required

No need for a build process or even a web server. Just use static files, open in a browser and hit refresh :-). Or run [Browsersync](https://www.browsersync.io/) in watch mode for auto-reload.

ATTENTION! This is all good for dev environment only. Before going to production, you still need to setup webpack/rollup/eslint/karma/whatever and run a proper build. It is not a good idea to transpile your code in-browser in production (unless it is only required for a small number of older browsers - but we are not there yet :-).

## Installation

There is nothing to install, just include a link to `getlibs` script on CDN -

```html
<script src="https://unpkg.com/getlibs"></script>
```

## Usage

Organize your code as separate modules and call `System.import()` to load the app.
```html
<script>
    System.import('./main.js');
</script>
```

Or use `<script type="x-module">...</script>` to put everything into `index.html`

##### ES5/require()
```js
var compile = require('lodash/template'),
    template = require('./hello.tpl'),
    data = require('./hello.json'),
    render = compile(template);

document.getElementById('app').innerHTML = render(data);
```

<a href="https://github.com/activewidgets/getlibs-lodash-hello-js" target="_blanc">[Full Source]</a> &nbsp;
<a href="https://activewidgets.github.io/getlibs-lodash-hello-js/" target="_blanc">[Open in browser]</a> &nbsp;


##### ES6/import
```js
import React from 'react';
import ReactDOM from 'react-dom';
const msg = 'Hello World!';

ReactDOM.render(<h1>{msg}</h1>, document.getElementById('app'));
```

<a href="https://github.com/activewidgets/getlibs-react-hello-es" target="_blanc">[Full Source]</a> &nbsp;
<a href="https://activewidgets.github.io/getlibs-react-hello-es/" target="_blanc">[Open in browser]</a> &nbsp;


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

<a href="https://github.com/activewidgets/getlibs-angular-hello-ts" target="_blanc">[Full Source]</a> &nbsp;
<a href="https://activewidgets.github.io/getlibs-angular-hello-ts/" target="_blanc">[Open in browser]</a> &nbsp;


## How it works

`getlibs` is based on [SystemJS](https://github.com/systemjs/systemjs) module loader. Instead of typical setup where it looks for external packages in `node_modules` directory, `getlibs` is configured to load libraries directly from NPM (via [unpkg.com](https://unpkg.com/)) or [cdnjs.com](https://cdnjs.com/), if available.

## About

[SystemJS](https://github.com/systemjs/systemjs) is a module loader developed by [Guy Bedford](https://github.com/guybedford).

`getlibs` is a bundle of SystemJS with a custom config - maintained by [ActiveWidgets](http://www.activewidgets.com/). 

