## Tutorial

  Hello there. I am going to show you how to build a project management desktop app with the React Framework that helps illustrate project ideas or steps into timelines that can be viewed in many forms based on your selection.

## Tools

- React Framework by Facebook
- Electron Framework by Github

## Installation

  You need to have NodeJS installed on your machine, at the time of this tutorial the recommended version is 15.0.1. \n
  Download and install your copy at https://nodejs.org/en/download/\n
  \n

  Head over to any directory or folder via your Terminal or Command Prompt, you would like to create your app.\n
  I created mine on my Desktop.\n

  Run npx create-react-app {appName} \n
  Note 2 things here:\n
  1. We are using npx to install temporarily the latest version of create-react-app \n
  2. {appName}: Replace it what you would like to name your project \n
  \n

  When your through, your command should look like this \n
  npx create-react-app samson\n
  N.B. samson is the name of my project
  \n
  For the final Part of the Installation, we are going to add the Electron Framework with our React App.
  Why? \n
  Electron allows us to build native desktop apps with HTML,JS and CSS.\n
  When your through and the terminal says Happy Hacking! \n

  \n
  cd into your project.e.g.
  cd samson to enter into your project \n

  type npm i -D electron to install electron in our dev dependencies \n
  once you do that and installs its native binaries and Chromium, your good to go🤟.
\n\n

## Packages Used \n
  - Material-ui for Styling\n
  - PayStack to collect Payment reason being Stripe isn't yet in Africa as of the time\n
  - Electron Builder to build our desktop app when ready\n
  - NodeSass to transpile our scss files to CSS\n
  - React-router-dom to route between pages\n
  - electron-db to store our user's data in JSON for our app. \n
    \n
    So install all of these dependencies but regarding Material-UI, you will need to install some other libraries to help out.\n
    You can do it with one line \n
    npm i @material-ui/icons @material-ui/lab @material-ui/pickers clsx date-fns @date-io/date-fns@1.3.0 \n
    \n
    Make sure your @date-io/date-fns library is below V2 for the date picker to work
\n\n

## Hooking Up Election with react\n
  - Create a start.js file in your src directory and a electron.js file in your public directory.\n
  - Copy all of what i have in my repo in start.js to the files you just created above\n
    It will help to create an instance of our desktop and app, create a new Browser Window and serve our react app with Hot Refresh Enabled. \n
  - Also copy my start-react.js \n
  - Install foreman \n
  Change your start script in package.json to nf start -p 3000 \n
  Run npm start and you should see a desktop app with menus and the React Spinning Logo \n

## Technologies and Techniques Used
  - I used Hooks provided by the React Framework such UseState and UseEffect
  - I created every component separately and exported them
  - I created a theme so i can customise Material UI to my own taste
  - I made a database.js file for my database operations and converted its functions to promises that will be resolved

## Demo
  - Clone this repo
  - Run npm i to install all the dependencies needed
  - Run npm start
