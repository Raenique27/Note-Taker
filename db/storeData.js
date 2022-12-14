const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Save {
    write(note) {
        return writeFile('db/db.json', JSON.stringify(note));
    }
    read() {
        return readFile('db/db.json', 'utf8');
    }
    getNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }
    addNotes(note) {
        const {title, text} = note;
        if(!title || !text) {
            throw new Error('Please enter a title and text!');
        }
        const newNote = {
            title, 
            text, 
            id: uuidv4()
        };

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }

};

module.exports = new Save();
