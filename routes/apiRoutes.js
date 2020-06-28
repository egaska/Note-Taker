const fs = require("fs");
const path = require("path");

module.exports = function (app) {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    //Loads data from data files
    var notesData = require("../db/db.json");
    let notes = JSON.parse(data);

    //Routing

    if (err) throw err;
    //GET method
    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });

    //POST method
    app.post("/api/notes", function (req, res) {
        let newNote = req.body;
        notes.push(newNote);
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return console.log("Added new note: " + newNote.title);
    });
    });

    app.delete("/api/db/:id", function (req, res) {
      let el = parseInt(req.params.id);
      let tempNote = [];
      for (let i = 0; i < notesData.length; i++) {
        if (i !== el) {
          tempNote.push(noteData[i]);
        }
      }
      res.json("Note Deleted");
    });
  });
};
