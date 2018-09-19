# ChRec
**Ch**romium **Rec**order. Visually Stabilizing Selenium Web Recorder for Automated User Acceptance Tests.

## Installation Instructions for Development
Make sure to have the newest versions of Node.js and npm.

### 1. OpenCV
CMake is required. You can get it from: https://cmake.org/download/. Add it's *bin* folder to **PATH**.

On **Windows** you will need Windows Build Tools to compile OpenCV, which is a critical dependency of this project. If you don't have Visual Studio or Windows Build Tools installed, you can easily install the VS2015 build tools. Just run the following command as administrator:

```
npm install --global windows-build-tools --vs2015
```

### 2. ChRec
Clone this repository:
```
git clone https://github.com/cyluxx/chrec.git
```

Navigate to installed location and install dependencies (this might take a while). Then rebuild native modules.
```
cd chrec
npm install
npm run electron-rebuild
```

To start the application in development mode, type:
```
npm run start
```

The application should run with hot reload in a new window.

### 3. Selenium Server
For replaying sequences you will need the selenium standalone server. You can download it from: https://www.seleniumhq.org/download/.

To start the _Java_ version of Selenium, type:
```
java -jar .\selenium-server-standalone-3.9.1.jar
```

Selenium should now run on port 4444.