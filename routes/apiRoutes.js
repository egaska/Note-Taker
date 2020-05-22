//Loads data from data files
var noteData = require("../db/db.json");

//Routing
module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });

    app.post("/api/notes", function (req, res) {
        res.json(noteData)
    });

    app.delete("/api/clear", function (req, res) {
        // Empty out the arrays of data
        noteData;
        res.json({ ok: true });
    });
}
