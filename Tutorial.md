## Tutorial

  Hello there. I am going to show you how to build a project management desktop app with the React Framework that helps illustrate project ideas or steps into timelines that can be viewed in many forms based on your selection.

## Tools

- React Framework by Facebook
- Electron Framework by Github

## Installation

  You need to have NodeJS installed on your machine, at the time of this tutorial the recommended version is 15.0.1.
  Download and install your copy at https://nodejs.org/en/download/

  Head over to any directory or folder via your Terminal or Command Prompt, you would like to create your app.
  I created mine on my Desktop.

  Run npx create-react-app {appName}
  Note 2 things here:
  1. We are using npx to install temporarily the latest version of create-react-app
  2. {appName}: Replace it what you would like to name your project 

  When your through, your command should look like this 
  npx create-react-app samson
  N.B. samson is the name of my project
  
  For the final Part of the Installation, we are going to add the Electron Framework with our React App.
  Why? 
  Electron allows us to build native desktop apps with HTML,JS and CSS.
  When your through and the terminal says Happy Hacking!

  cd into your project.e.g.
  cd samson to enter into your project 

  type npm i -D electron to install electron in our dev dependencies 
  once you do that and installs its native binaries and Chromium, your good to go🤟.


## Packages Used 
  - Material-ui for Styling
  - PayStack to collect Payment reason being Stripe isn't yet in Africa as of the time
  - Electron Builder to build our desktop app when ready
  - NodeSass to transpile our scss files to CSS
  - React-router-dom to route between pages
  - electron-db to store our user's data in JSON for our app. 
    
    So install all of these dependencies but regarding Material-UI, you will need to install some other libraries to help out.
    You can do it with one line 
    npm i @material-ui/icons @material-ui/lab @material-ui/pickers clsx date-fns @date-io/date-fns@1.3.0 
    
    Make sure your @date-io/date-fns library is below V2 for the date picker to work


## Hooking Up Election with react
  - Create a start.js file in your src directory and a electron.js file in your public directory.
  - Copy all of what i have in my repo in start.js to the files you just created above
    It will help to create an instance of our desktop and app, create a new Browser Window and serve our react app with Hot Refresh Enabled. 
  - Also copy my start-react.js 
  - Install foreman 
  Change your start script in package.json to nf start -p 3000 
  Run npm start and you should see a desktop app with menus and the React Spinning Logo 

## Technologies and Techniques Used
  - I used Hooks provided by the React Framework such UseState and UseEffect
  - I created every component separately and exported them
  - I created a theme so i can customise Material UI to my own taste
  - I made a database.js file for my database operations and converted its functions to promises that will be resolved

## Demo
  - Clone this repo
  - Run npm i to install all the dependencies needed
  - Run npm start
