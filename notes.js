const fs = require('fs');

let fetchNotes = () => {
    try {
        let noteString = fs.readFileSync('notes-date.json');
        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }
}

let saveNotes = (notes) => {
    fs.writeFileSync('notes-date.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title: title,
        body: body
    }

    let duplicateNotes = notes.filter((note) => {
        return note.title === title;
    })

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

let getAll = (title, body) => {
    console.log("Get all");
    return fetchNotes();
}

let getNote = (title) => {
    let notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    console.log('Getting note ', title);
    return filteredNotes[0]
}

let removeNote = (title) => {
    //fetch notes
    var notes = fetchNotes();
    //filter notes
    var filteredNotes = notes.filter((note) => note.title !== title);
    //save note
    saveNotes(filteredNotes);
    //check if note was removed
    return notes.length !== filteredNotes.length;
}

let logNote = (note) => {
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote: addNote,
    getAll: getAll,
    getNote: getNote,
    removeNote: removeNote,
    logNote: logNote
}