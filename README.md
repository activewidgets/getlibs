

[![ActiveWidgets](http://www.activewidgets.com/include/logo/aw-logo-40.png?vue-adapter-readme)](http://www.activewidgets.com/)

## SystemJS + Unpkg = :-)

Pre-configured SystemJS + Unpkg setup for easy prototyping

## Installation

Just include a link to ax-system script on unpkg CDN.

```html
<script src="https://unpkg.com/ax-system"></script>
```

## Usage

ES6 and JSX are included (via client-side Babel plugin). The dependencies automagically pulled by SystemJS directly from unpkg CDN.

```js
<script type="x-module">

  import React from 'react';
  import ReactDOM from 'react-dom';

  let hello = <b>Hello, JSX!</b>;

  ReactDOM.render(hello, document.getElementById('app'));

</script>
```

Old-style ES5/require() also work.

```js
<script type="x-module">

  var $ = require('jquery');

  $('#app').text('Hello!');

</script>
```

Load external files via `System.import()` -

```js
<script>
    System.import('./app.js'); // async, returns promise
</script>
```

Load CSS, HTML (via pre-configured SystemJS plugins) - 

```js
    require('./app.css'); // injected as <style> tag
    
    var template = require('./app.html');
```
