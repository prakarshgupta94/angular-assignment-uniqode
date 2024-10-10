# angular-assignment

## Overview

This repository contains angular assignment for Uniqode

## Optimisations/Changes Done:

- angular.json
  - The app was not bootstraping due to wrong configurations in angular.json
  - added styles for ngx-datatable and bootstrap
  - removed commented code
- app.component.ts
  - used forkJoin to handle parallel API call and show a loader in the button to handle async operation, previously if I show datatable, for the first time table was loaded with empty results even when the results were available in the component.
  - handled button loader
  - Enhanced the UI of datatable by utilising the ngx-datatable docs, used bootstrap UI
  - Added client side pagination in the table.
- app.component.html
  - enhanced the UI to be in container.
  - fixed buttons UI
  - Added a top action center for all the buttons and the timer.
  - handled button state for pokemon table and coming back to posts
- added a gitignore file to avoid local setup files sync on github
- removed unnecessary firebase initialisation
- Fixed exported csv data
- Seperation of concern
  - created routing
  - created different component for pokemon and posts home
  - created seperate services for pokemon and posts.
