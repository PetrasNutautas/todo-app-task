const express = require("express");
const path = require("path");
const app = express(),
  bodyParser = require("body-parser");
port = 80;

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let db = admin.firestore();
let a = db.collection("tasks");

let docRef = a.doc("data");

let tasks = [];

docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      tasks = JSON.parse(doc.data().json);
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../build")));

app.get("/api/tasks", (req, res) => {
  console.log("api/tasks called!");
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  tasks = req.body.tasks;
  docRef.set({ json: JSON.stringify(tasks) });
  console.log("tasks updated");
  res.json("tasks updated");
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
