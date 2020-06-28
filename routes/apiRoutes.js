//Loads data from data files
var notesData = require("../db/db.json");

//Routing
module.exports = function (app) {
  //GET method
  app.get("/api/notes", function (req, res) {
    res.json(noteData);
  });
  //POST method
  app.post("/api/notes", function (req, res) {
    if (notesData.length === 0) {
      req.body.id = "0";
    } else {
      req.body.id = JSON.stringify(
        JSON.parse(notesData[notesData.length - 1].id) + 1
      );
    }
    console.log("req.body.id: " + req.body.id);

    notesData.push(req.body);

    notesData = JSON.stringify(notesData);
    fs.writeFileSync("./db/db.json", notesData);

    res.json(req.body);
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
};
