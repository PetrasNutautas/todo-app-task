To run the project:

1. cd nodejsservice
2. npm install
3. npm start
4. New terminal window at project root
5. npm install
6. npm start

Review of the code:

1. I really don't like the use of class components. There is no significant benefit, and it complicated things significantly with the use of 'this' keyword to manage state, and inability to use hooks.
2. The initial project was set-up as index.js, and while that is fine, it misses a lot of benefits that come from Typescript. Had to re-initialize the project using npx create-react-app --template typescript
3. While it's reasonable to have in state two separate lists - "active" and "completed", as well as "total" as a numeric value, in practice that means there is always possibilities for de-synchronisation if something goes wrong - a task gets removed from one list and not added to another, or the total number is not incremented. A better practice is to have a more robust data structure with "done" as one of parameters in Task interface, and then derive all the sub-arrays as filters from the original array.
4. Using numerical "id" parameter for tasks allows to reference tasks, without the possibility of duplication if referenced through task title.
5. Adding a NodeJS service and a Firebase database is pretty straightforward, not a lot to comment there. Initializing the NodeJSService fetches data from firebase, initializing the React app fetches data from NodeJSService. Any update to React app state gets posted to NodeJSService, which posts to Firebase. Everything persists, all is magic.
6. "clear" button is added at the bottom so that I wouldn't have to keep going to firebase and resetting the data to empty array when I want to clean up the screen.
