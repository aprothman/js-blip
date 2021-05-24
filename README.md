# js-blip
## JavaScript Browser Library Pattern

This project is a proof-of-concept for the JavaScript Browser Library Pattern. The pattern is intended to be used in an enterprise development environment where a bundled JavaScript library on the browser exposes an API to be used by front-end code. Included in the pattern are code file bundling, linting, minifying, unit testing, and a GitHub continuous integration (CI) workflow to do all of this in an automated way. This repository is designed to be forked and used as a template for library development.

## Quickstart
Ensure that [node.js](https://nodejs.org) is installed.

From the command line:

    git clone git@github.com:aprothman/js-blip.git

    cd js-blip

    npm install

    npm run build

    npm run test

View your local copy of [index.html](https://github.com/aprothman/js-blip/blob/main/index.html) directly in a browser or on a web server (such as the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) plugin for [VSCode](https://code.visualstudio.com/)) to see how the bundled library API might be consumed in a production environment.

## Underlying Principles

The goal of a developer using this pattern is to write a module-based ECMAScript library that runs in the browser and exposes an API to front-end JavaScript code. We use node.js and npm purely as development tools to execute our build and test processes. The build step lints the code before bundling and minifying it. The test step runs automated unit tests on the exported API objects.

We're using ES modules in our browser environment, so it's important to note that this is incompatible with the node.js environment that will be running our unit tests. That's why we also build a CommonJS bundled library as part of our build step. The unit tests are run against this CJS bundle.

## Enforcing Code Style

It's hard to overstate the importance of coding style standards. Whatever standards you choose to follow, it's critically important in an enterprise environment to strictly enforce them with a linter. And because it's sometimes necessary to make a conscious decision to defy a standard in a specific place, it's important to annotate your source code when you do.

We use the excellent [AirBnb JavaScript Style Guide](https://github.com/airbnb/javascript) and its convenient implementation using the [ESLint](https://eslint.org) linter. I strongly recommend linking your linter into your IDE. [VSCode](https://code.visualstudio.com/) has an excellent ESLint plugin.

## Bundling with Rollup

We use [Rollup](https://rollupjs.org/) to convert all of the code files in the project to a single bundled JavaScript file. Rollup's behavior is defined in [rollup.config.js](https://github.com/aprothman/js-blip/blob/main/rollup.config.js). Plugins for [ESLint](https://eslint.org) and [terser](https://terser.org) let the Rollup process additionally do style checking and minification. Shell environment variables further refine the behavior. By setting `NODE_ENV='development'`, minification can be turned off. Setting `BUILD_TESTS='no'` causes Rollup to skip building the CommonJS bundle.

The project should define all of its public exports in the [Exports.js](https://github.com/aprothman/js-blip/blob/main/export/Exports.js) file. This file is passed as the input to Rollup, and it's used to find all of the modules necessary for building the bundle.

The scripts section of the [package.json](https://github.com/aprothman/js-blip/blob/main/package.json) file contains the Rollup command line, so this will allow us to trigger the process using npm:

``` sh
# build with defaults (including tests and minification)
npm run build

# skip minification
NODE_ENV='development' npm run build

# skip building the CJS module for unit tests
BUILD_TESTS='no' npm run build
```

## Testing with Mocha and Chai

The test directory contains definitions for all of the unit tests. We use [mocha](https://mochajs.org) as our test runner and [chai](https://www.chaijs.com/) to implement our assertions. Any reasonable testing framework should work, however, as long as you edit the scripts section of [package.json](https://github.com/aprothman/js-blip/blob/main/package.json) appropriately. Keep in mind that code in the test directory won't be able to understand or use ES modules since it will be run by a node.js process, so use CommonJS modules for test implementations. We'll therefore be running our tests against the CJS bundle (`JsBlipCjs.js` in this case). Place any support modules in subdirectories like the `mock` directory.

It's important to cover all API exports with unit tests, but we're not worried about internal classes here. We also don't want to probe complex behavior behind the superficial API level, and we certainly don't want our automated unit tests to depend on something like a database or a web API. Integration and other tests should probably exist, but they don't belong in a CI workflow. Take a look at our tests -- especially the way we use the [ConnectionManagerMock.js](https://github.com/aprothman/js-blip/blob/main/test/mock/ConnectionManagerMock.js) file that substitutes for the [ConnectionManager.js](https://github.com/aprothman/js-blip/blob/main/src/backend/ConnectionManager.js) file which would be used in a production environment.

## Automating with a GitHub CI Workflow

We define a CI workflow that's available on the GitHub Actions tab. The steps are laid out in [ci.yml](https://github.com/aprothman/js-blip/blob/main/.github/workflows/ci.yml). On every push or pull request, the default steps will be run, initializing the server environment and executing the build and test processes. If everything runs successfully, a link to the ES bundle output file (`JsBlip.js` in this case) is made available for download as a build artifact below each workflow result report.

Additionally, when the CI workflow is selected on the Actions tab, a button is available to directly run the action with parameters. This will let you generate the output file on demand, optionally minifying it and also optionally skipping the unit tests.

## Visual Studio Code Integration

The [VSCode](https://code.visualstudio.com/) editor provides a number of tools that can integrate pretty well with this pattern. Aside from the obvious linting support, the [Tasks](https://code.visualstudio.com/docs/editor/tasks) feature allows us to quickly build and test our library. The [tasks.json](https://github.com/aprothman/js-blip/blob/main/.vscode/tasks.json) file contains definitions for two tasks that can be run from the Terminal menu, a build task and a test task. These will run our previously defined npm scripts in a local terminal window with the appropriate environment variables defined. In addition, the build task can be executed by the keyboard shortcut `Ctrl+Shift+B`.

[VSCode](https://code.visualstudio.com/) also offers integrated debugging support for multiple browsers as well as support for directly launching the application from the [Run View](https://code.visualstudio.com/docs/editor/debugging#_run-view). To take advantage of the launch options in this template, be sure to install the degugger extensions for Firefox and Chrome. The Run menu or the launch button will then open [index.html](https://github.com/aprothman/js-blip/blob/main/index.html) in a browser while linking the source files in the code editor to that browser's debugger API.
