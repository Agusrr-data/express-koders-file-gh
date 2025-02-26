const express = require("express");

const kodersUseCase = require("./koders");
const db = require("./db");

const server = express();
const port = 8080;

db.init();
server.use(express.json());

server.get("/koders", (request, response) => {
    const koders = kodersUseCase.getAll();

    response.json({
        message: "all koders get",
        success: true,
        data: { koders },
    });
});

server.post("/koders", (request, response) => {
    const name = request.body.name;

    try {
        const koders = kodersUseCase.add(name);
        
        response.json({
                message: "koder created",
                success: true,
                data: { koders },
            });
    } catch (error) {
        response.status(400);
        response.json({
            message: error.message,
            success: false,
        });
    };
   
    
});

server.delete("/koders/:name", (request, response) => {
    const name = request.params.name;

    const koders = kodersUseCase.removeByName(name);    

    response.json({
        message: "koder deleted",
        success: true,
        data: { koders },
    });
});

server.delete("/koders", (request, response) => {
    kodersUseCase.removeAll();

    response.json({
        message: "all koders deleted",
        success: true,
    });
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
 
});




// NOOB VERSION ///
// Este es el código inicial, que posteriormente modularizamos//
/*
const express = require("express");
const fs = require("node:fs");

const server = express();
const port = 8080;

const fileName = "koders.json";

function init() {
    const exists = fs.existsSync(fileName);

    if (!exists) {
        fs.writeFileSync(fileName, JSON.stringify([]), "utf8");
    }
}

function getKoders() {
    const content = fs.readFileSync(fileName, "utf8");
    return JSON.parse(content);
}

function setKoders(newKoders) {
    fs.writeFileSync(fileName, JSON.stringify(newKoders), "utf8");
}

init();
server.use(express.json());

server.get("/koders", (request, response) => {
    const koders = getKoders();

    response.json({
        message: "all koders get",
        success: true,
        data: { koders },
    });
});

server.post("/koders", (request, response) => {
    const name = request.body.name;

    if (!name) {
        response.status(400);
        response.json({
            message: "name is required",
            success: false,
        });
        return;
    };

    const koders = getKoders();
    koders.push(name.toLowerCase);

    setKoders(koders);

    response.json({
        message: "koder created",
        success: true,
        data: { koders },
    });
});

server.delete("/koders/:name", (request, response) => {
    const name = request.params.name;
    
    if (!name) {
        response.status(400);
        response.json({
            message: "name is required",
            success: false,
        });
        return;
    }

    const koders = getKoders();

    const newkoders = koders.filter(
        (koder) => koder.toLowerCase() !== name.toLowerCase()
    );

    setKoders(newkoders);

    response.json({
        message: "koder deleted",
        success: true,
        data: { koders: newkoders },
    });
});

server.delete("/koders", (request, response) => {
    setKoders([]);

    response.json({
        message: "all koders deleted",
        success: true,
    });
});



server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
 
});

*/

