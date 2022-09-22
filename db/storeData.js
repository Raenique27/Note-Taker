const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Save {
    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }
    
};


