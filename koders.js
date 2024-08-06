const db = require("./db");

// Caso de uso
function add(name) {
    if (!name) {
        throw new Error("name is required");
    }

    const koders = db.getDB();
    koders.push(name);
    db.updateDB(koders);
    return koders;
}

// Caso de uso
function removeByName(name) {
    if (!name) {
        throw new Error("name is required");
    }
    
    const koders = db.getDB();

    const koderFound = koders.find(
        (koder) => koder.toLowerCase() === name.toLowerCase()
    );

    if (!koderFound) {
        throw new Error("koder not found");
    }
    
    const newKoders = koders.filter(
        (koder) => koder.toLowerCase() !== name.toLowerCase()
    );

    db.updateDB(newKoders);

    return newKoders;
}

// Caso de uso
function removeAll() {
    db.updateDB([]);
}

// Caso de uso
function getAll() {
    return db.getDB();
}


module.exports = {
    add,
    removeByName,
    removeAll,
    getAll
}


