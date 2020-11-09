var db = require("../db/db");
var fs = require('fs');

function addID(data) {
  for (let i = 0; i < data.length; i++) {
    data[i]["id"] = i + 1;
  }
  writeData(JSON.stringify(data));
  return data;
}

function writeData(jsonData) {
  fs.writeFile("./db/db.json", jsonData, (err) => {
    if (err) throw err;
    //console.log('Data written to file');
  });
}

module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    db = addID(db);
    res.json(db);
  });

  app.delete("/api/notes/:id", function (req, res) {
    const id = parseInt(req.params.id);
    db = addID(db);
    let dbIndex = -1;
    for (let i = 0; i < db.length; i++) {
      if (id === parseInt(db[i].id)) {
        dbIndex = id - 1;
        break;
      }
    }
    db.splice(dbIndex, 1);
    res.json(db);
  });

  app.post("/api/notes", function (req, res) {
    db.push(req.body);
    db = addID(db);
    res.json(req.body);
  });

};
