const fs = require("fs");

let orginalNote = {
    title: 'title',
    body: 'body'
}

let orginalNoteString = JSON.stringify(orginalNote);

fs.writeFileSync('notes.json', orginalNoteString)

let noteString = fs.readFileSync('notes.json');

let note = JSON.parse(noteString);

console.log(typeof note);
console.log("note", note.title);