
# Generic Angular Bootstrap Modal

This is a package that extends the [UI Bootstrap](https://angular-ui.github.io/bootstrap/) modal. It configures the modal in a stylistically consistent way, while aiming to allow a high degree of flexibility.</p>

## Install

1. Install the package and its dependencies via npm:

```sh
# install dependencies
$ npm i angular angular-ui-bootstrap bootstrap --save

# install the package
$ npm i generic-modal --save
```

2. Iinclude the references in the HTML:

```html
<!-- Styling -->
<link
    href="./node_modules/generic-modal/dist/generic-modal.min.css"
    rel="stylesheet"
    type="text/css">

<!-- Scripts -->
<script src="./node_modules/generic-modal/dist/generic-modal.min.js"></script>
```

3. Inject the dependency in your Angular module and controller

```js
// Inject the ngGenericModule into your app's module
var app = angular.module('myApp', ['ngGenericModal'])

// Then, inject the genericModule factory into each controller that uses the modal
app.controller('MainController', ['genericModal', function(genericModal) {
    genericModal.open("Hi", "You opened the modal");
}]);
```

## Build from source

To build the package from source (for e.g. development), follow the following commands:

```sh
$ git clone https://github.com/one-acre-fund/generic-modal.git
$ cd generic-modal
$ npm i
$ gulp
```

The `gulp` command compiles the source files in `src` and pipes them to the `dist` directory. You shouldn't edit the files in `dist` directly, as they'll be overwritten when `gulp` is run.

## Try the demo

```sh
$ cd generic-modal
$ open index.html
```