# ChRec
Visually Stabilizing **Ch**romium Selenium Web **Rec**order for Automated User Acceptance Tests.

## Installation Instructions for Development
Make sure to have the newest versions of [_Node.js_ and _npm_](https://nodejs.org/en/).

### 1. Selenium Server
For replaying sequences you will need the _Selenium_ standalone server or a configured _Selenium_ grid. You can download it from: https://www.seleniumhq.org/download/.

Depending on which browsers you want to use for testing, you should install and configure their corresponding webdrivers:
* [Chrome](http://chromedriver.chromium.org/)
* [Edge](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
* [Firefox](https://github.com/mozilla/geckodriver)
* [Internet Explorer](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)

To start the _Java_ version of _Selenium_, type:
```
java -jar .\selenium-server-standalone-3.9.1.jar
```

Selenium should now run on port 4444.

### 2. ChRec
Clone this repository:
```
git clone https://github.com/cyluxx/chrec.git
```

Navigate to the installed location and install dependencies (this REALLY might take a while).
```
cd chrec
npm install
```

To start the application in development mode, type:
```
npm run start
```

The application should run with hot reload in a new window.
