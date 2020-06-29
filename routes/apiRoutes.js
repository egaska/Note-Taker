const fs = require("fs");
const notes = require("../db/db.json");

// Set unique id to entry
 let id = notes.length + 1;
 //Loads data from data files

module.exports = function (app) {
  
  //Routing

  //GET method
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  //GET specfic id
  app.get("/api/notes/:id", function (req, res) {
    // display json for the notes array indices of the provided id
    res.json(notes[req.params.id]);
  });

  //POST method
  app.post("/api/notes", function (req, res) {
      req.body.id = id++;
    notes.push(req.body);
    fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
      if (err) throw err;
      return console.log("Added new note");
    });
    res.json(notes);
  });

  app.delete("/api/notes/:id", function (req, res) {
    let id = req.params.id.toString();

    for (i = 0; i < notes.length; i++) {
      if (notes[i].id == id) {
        console.log(notes[i].title);
        console.log("Id Match: " + id);

        // Removes the deleted note

        notes.splice(i, 1);
        break;
      }
    }
    pushToDB(notes);
    // responds with deleted note
    res.json(notes);
  });
};

function pushToDB(notes) {
  notes = JSON.stringify(notes);
  fs.writeFileSync("./db/db.json", notes, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}
