const fs = require("fs");

module.exports = function (app) {

  fs.readFile("db/db.json", "utf8", (err, data) => {

    if (err) throw err;
    
    //Loads data from data files
    var notesData = require("../db/db.json");
    let notes = JSON.parse(data);

    //Routing

    if (err) throw err;
    //GET method
    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });

    //GET specfic id
    app.get("/api/notes/:id", function(req,res) {
        // display json for the notes array indices of the provided id
        res.json(notes[req.params.id]);
    });

    //POST method
    app.post("/api/notes", function (req, res) {
        // Set unique id to entry
        if (notesData.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(notesData.length) + 1);
        }
        notes.push(req.body);
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return console.log("Added new note");
    });
    });

    app.delete("/api/notes/:id", function (req, res) {
        notes.splice(req.params.id, 1);
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) throw err;
            return console.log("Deleted note " + req.params.title);
    });
     
    });
  });
};
