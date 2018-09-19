# ChRec
An intelligent user interaction recorder based on Chromium.

## Installation Instructions for Development
Make sure to have the newest versions of Node.js and npm.

Clone this repository:
> git clone https://github.com/cyluxx/chrec.git

Navigate to installed location and install dependencies:
> cd chrec

> npm install

To start the application in development mode, type:
> npm run start

The application should run with hot reload in a new window.

For replaying sequences you will need the selenium standalone server. You can download it under: https://www.seleniumhq.org/download/.

To start the _Java_ version of Selenium, type:
> java -jar .\selenium-server-standalone-3.9.1.jar

Selenium should now run on port 4444