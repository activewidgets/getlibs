

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

