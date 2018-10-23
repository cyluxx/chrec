# ChRec
Visually Stabilizing **Ch**romium Selenium Web **Rec**order for Automated User Acceptance Tests.

## Installation Instructions for Development
Make sure to have the newest versions of Node.js and npm.

### 1. OpenCV
CMake is required. You can get it from: https://cmake.org/download/. Add it's *bin* folder to **PATH**.

On **Windows** you will need Windows Build Tools to compile OpenCV, which is a critical dependency of this project. If you don't have Visual Studio or Windows Build Tools installed, you can easily install the VS2015 build tools. Just run the following command as administrator:

```
npm install --global windows-build-tools --vs2015
```

### 2. Selenium Server
For replaying sequences you will need the selenium standalone server. You can download it from: https://www.seleniumhq.org/download/.

To start the _Java_ version of Selenium, type:
```
java -jar .\selenium-server-standalone-3.9.1.jar
```

Selenium should now run on port 4444.

### 3. ChRec
Clone this repository:
```
git clone https://github.com/cyluxx/chrec.git
```

Navigate to installed location and install dependencies (this REALLY might take a while). Then let electron rebuild native modules.
```
cd chrec
npm install
npm run electron-rebuild
```
> **Note:** Use 'npm run electron-rebuild' after 'npm install' if you are adding or modifying native modules during development.

### 3.1 Temporary Ugly Solution for OpenCV: 
use 
```
let cv = require('../build/Release/opencv4nodejs.node')
```
instead of
```
//let cv = isElectronWebpack ? require('../build/Release/opencv4nodejs.node') : require('./cv')
```
in _node_modules/opencv4nodejs/lib/opencv4nodejs.js_

To start the application in development mode, type:
```
npm run start
```

The application should run with hot reload in a new window.