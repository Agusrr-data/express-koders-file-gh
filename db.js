const fs = require("node:fs");

const dbName = "koders.json"

function init() {
    const exist = fs.existsSync(dbName);
    if (!exist) {
        fs.writeFileSync(dbName, JSON.stringify([]), "utf8");
    }
}

function getDB() {
    const content = fs.readFileSync(dbName, "utf8");
    return JSON.parse(content);
}

function updateDB(newData) {
    fs.writeFileSync(dbName, JSON.stringify(newData), "utf8");
}

module.exports = {
    init,
    getDB,
    updateDB,
}