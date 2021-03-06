const fs = require("fs");
const path = require("path");

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;

    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }

    return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }

    if (!note.text || typeof note.text !== 'string') {
        return false;
    }

    return true;
}

function deleteNote(id, notesArray) {

    let index = notesArray.findIndex(note => note.id === id);
    if (index !== -1) {
        notesArray.splice(index, 1);

        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify({
                notes: notesArray
            }, null, 2)
        );    
    }

    return notesArray;
}

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
    deleteNote
};
