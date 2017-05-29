---
title: Modern javascript. All front-end libraries. No server/build.
description: the simplest way to start a new project.
---


![Code preview](code.gif)

## All javascript libraries in one file

`getlibs` is a pre-configured module loader which pulls external dependencies directly from CDN. Instead of tracking and installing each library just include a single script and you can import/require any front-end library available on NPM (via unpkg.com and cdnjs.com).

## Write modern javascript (or typescript)

Write ES6 or JSX or typescript and your code will be converted on the fly. The transpiler will run in a worker thread and process only the changed files. Except for the first time, you might not even notice the delay because all that happens in parallel with loading and initializing your UI framework.

## No server/build required

Running your code with `getlibs` does not require any build process or even a web server. Just use static files, open in a browser and hit refresh :-). This might be the easiest way to start a new project, do some prototyping, share code samples, teach or learn the new stuff.

However, before going to production, you still need to setup webpack/rollup/eslint/karma/whatever. The `getlibs` project is currently for DEV ONLY.

## Installation

There is nothing to install, just include a link to `getlibs` script on CDN -

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



Use `System.import()` in a script tag to load your code into the page.
```html
<script>
    System.import('./main.js');
</script>
```

## How it works

`getlibs` is a SystemJS module loader with custom configuration, which looks for all external modules directly on CDN.

## About

`getlibs` is an open source project developed by ActiveWidgets.