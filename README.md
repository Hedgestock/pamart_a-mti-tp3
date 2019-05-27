# Enhanced Applications

## Tweepita

Tweepita is your chance a challenging Twitter with less features, and thus less bugs.

## The tools

You decide (well, I do...) to use Webpack as the basis for your stack.

### Init your front-end project

let's run `yarn init`.

#### Webpack

Once this is done we will add `webpack` to the dev dependencies (`npm install webpack --save-dev` or `yarn add webpack --dev`), `webpack-dev-server` and `webpack-merge`.

Now that we have webpack installed, let's write its configuration.

We'll have three separate configuration files:

- `./config/webpack/commmon.js`, which will contain the main configuration.
- `./config/webpack/build.js`, which will allow us to build for production.
- `./config/webpack/server.js`, which will allow us to run a development server.

To be able to run our configurations, let's add the following lines to your `package.json`:

```JSON
{
"start": "./node_modules/.bin/webpack-dev-server --config ./config/webpack/server.js",
"build": "./node_modules/.bin/webpack --config ./config/webpack/build.js"
}
```

##### Common configuration

First off, we'll need a few tools for our `common.js` configuration

```
const fs = require('fs');
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
```

A webpack configuration works as any node module, it uses `module.exports` to be readable

```javascript
module.exports = {
// makes missing exports an error instead of warning
strictExportPresence: true,

// rules will work as a router, all files go through them when they are loaded,
// if they match with a regex, they are transformed using the related "loader"
rules: [],

// plugins are used to do computations on the bundle level
plugins: [],

// Some libraries import Node modules but don't use them in the browser.
// Tell Webpack to provide empty mocks for them so importing them works.
node: {
dgram: 'empty',
fs: 'empty',
net: 'empty',
tls: 'empty',
child_process: 'empty',
},
}
```

Webpack can be used to bundle any kind of file, as long as we hae the suitable loader,
therefore we will add a install a few useful loaders.

- `babel-loader` -> will allow us to load JS files by converting ES features through babel
- `url-loader` -> will convert files into urls, and into data-urls when small enough
- `html-webpack-plugin` + `html-loader` -> will allow us to import our `index.html` (and will add the neccessary `<script>` tags for us into it) 
- `css-loader` -> converts css into raw text and adds the logic for inserting it as a stylesheet on runtime
- `mini-css-extract-plugin` -> will minify and optimize our raw css
- `file-loader` -> converts files into urls (and moves those files to the destination folder)

let's add those:

```javascript
module.exports = {
module: {
strictExportPresence: true,
rules: [
{
// "oneOf" will traverse all following loaders until one will
// match the requirements. When no loader matches it will fall
// back to the "file" loader at the end of the loader list.
oneOf: [
// "url" loader works just like "file" loader but it also embeds
// assets smaller than specified size as data URLs to avoid requests.
{
test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
loader: 'url-loader',
options: {
limit: 10000,
name: 'static/media/[name].[hash:8].[ext]',
},
},
// Process JS with Babel.
{
test: /\.(js|jsx)$/,
exclude: /node_modules/,
use: {
loader: 'babel-loader',
},
},
{
test: /\.html$/,
use: [
{
loader: 'html-loader',
options: { minimize: true },
},
],
},
{
test: /\.css$/,
use: [MiniCssExtractPlugin.loader, 'css-loader'],
},
// "file" loader makes sure assets end up in the `build` folder.
// When you `import` an asset, you get its filename.
// This loader doesn't use a "test" so it will catch all modules
// that fall through the other loaders.
{
loader: 'file-loader',
// Exclude `js` files to keep "css" loader working as it injects
// it's runtime that would otherwise processed through "file" loader.
// Also exclude `html` and `json` extensions so they get processed
// by webpacks internal loaders.
exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
options: {
name: 'static/media/[name].[hash:8].[ext]',
},
},
],
},
],
},

plugins: [
new HtmlWebPackPlugin({
template: './src/index.html',
filename: './index.html',
}),
new MiniCssExtractPlugin({
filename: '[name].css',
chunkFilename: '[id].css',
}),
],

// Some libraries import Node modules but don't use them in the browser.
// Tell Webpack to provide empty mocks for them so importing them works.
node: {
dgram: 'empty',
fs: 'empty',
net: 'empty',
tls: 'empty',
child_process: 'empty',
},
};
```

##### Build for production and development

Now that we have got our configuration, let's write our production and development configurations.
We'll use `webpack-merge` to import our previous configuration and re-use it:

build.js:

```javascript
const webpackMerge = require('webpack-merge');
const commonConfiguration = require('./common');

module.exports = webpackMerge(commonConfiguration, {
mode: 'production',
});
```

server.js:

```javascript
const webpackMerge = require('webpack-merge');
const commonConfiguration = require('./common');

module.exports = webpackMerge(commonConfiguration, {
mode: 'development',
devServer: {
open: true,
overlay: true,
},
});
```

#### Babel

Before we go into running anything, Babel needs us to provide it with a configuration too.

We'd like to be able to use ES6 as our only language, and build for the two previous revisions of each browser.

First, let's add a few dev dependencies: `babel-core`, `babel-loader`, `babel-preset-env`, and `babel-preset-react`.

Usually babel uses a `.babelrc` file to load its configuration, but you can simply add it's configuration into your `package.json`.

```json
...
"babel": {
"presets": [
'react',
[
"env",
{
"targets": {
"browsers": [
"last 2 versions"
]
},
"modules": false
}
]
]
}
```

Notice the `modules: false` line: this tells Babel no to care about modules as Webpack will use its own internals to resolve them.

#### Add some sources

Now, the only thing we need to run, is actual files to be built,
let's add our first basics:

`./src/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
<title>What a wonderful app</title>
</head>

<body>
<div id="root"></div>
</body>

</html>
```

`./src/index.js`

```javascript
console.log("Hello World !"); // we'll, it's a classic, isn't it ?
```

Now, you can finally build your application by using `yarn build` and run a development server using `yarn start`.

### Let's get Reactive...

Install the following dependencies: `react@v16.2.0` `react-dom@v16.2.0`.
Add `react` to the list of presets you use in your babel configuration.

#### First hook up

Now in your `src/index.js` you can bind a React application to it by using `ReactDOM.render(<div>hello, student</div>, document.getElementById('root'))`.

#### Hot reload

To speed up your development cycle use webpacks' Hot Module Replacement:

* Add react-hot-loader/babel to your babel configuration:

```
// .babelrc
{
"plugins": ["react-hot-loader/babel"]
}
```

* Mark your root component as hot-exported:

```
// App.js
import React from 'react'
import { hot } from 'react-hot-loader'

const App = () => <div>Hello World!</div>

export default hot(module)(App)
```

* add `--hot` to your `webpack-dev-server` command line in `package.json`;

## The App

### Organise

- Add `redux` to your dependencies.
- Define what your actions are (basically, at this point you should be using a piece of paper).
Think of them as atomically as possible.
- Add a Redux store to your application (it will lay in a `store` folder))
- Write the reducer function for your tweets (it will lay in a `reducers` folder)
- Write the actions creators you need (they will lay in an `actions` folder)

hint: strings, as they can not be minified, are expensive, as all of our action types are strings,
a simple way to avoid gaining too much size is by using constants.

### Bind with the view

For this part, you will need to add `react-redux` to your dependencies.

#### Display

Create a component named  `TweetsList` in `./src/components/TweetsList`.
it will be in charge of displaying a future collection of tweets.

#### Getting data

Using `connect`'s `mapStateToProps`  function, bind your TweetsList to your store.
From now on, you cannot have any reference to `this.state` on your TweetsList.

#### Dispatching actions

to perform the following actions, you can only use `dispatch` along with the actions you defined earlier.

##### Add
Add an input to your app that will allow for adding a new Tweet.

##### Remove
Each of your tweets must now include a way (a cross, a button...) to be deleted.

## Bonus

* add a way to update a tweet
* Add ESLint to your project and use the right loader to hook it into your webpack configuration. Use AirBnB's configuration
* Use Jest to add Snapshot testing on your project
* Add Flowtype to your project.
* Describe your UI as routes and use react-router/react-router-redux to implement it.
