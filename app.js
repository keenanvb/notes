const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't' //node app.js add -t="flag tile" --b="body"
};

const bodyOptions = {
    describe: 'body of note',
    demand: true,
    alias: 'b' //node app.js add -t="flag tile" --b="body"
}

// const argv = yargs.argv;
//update yargs
//node app.js add --help
const argv = yargs.
command('add', 'add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'list all notes')
    .command('read', 'read a note', {
        title: titleOptions
    })
    .command('remove', 'remove a note', {
        title: titleOptions
    })
    .help() //node app.js --help
    .argv;

let command = argv._[0];
//console.log('Command: ', command);
//console.log('Yards', argv);

//node app.js add --title=secret --body="This is my secret"
if (command == 'add') {
    let note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);

    } else {
        console.log('note title taken');
    }
} else if (command == 'list') {
    let allNotes = notes.getAll();
    console.log(`printing...${allNotes.length}`);
    console.log('----------------------');
    allNotes.forEach((note) => {
        notes.logNote(note);
    });
} else if (command == 'read') {
    let note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found');
        notes.logNote(note);

    } else {
        console.log('Note not found');
    }
} else if (command == 'remove') {
    //node app.js remove --title=secret
    console.log('removing note');
    let noteRemoved = notes.removeNote(argv.title);
    let mgs = noteRemoved ? 'Note was removed' : 'Note was not removed'
    console.log(mgs);
} else {
    console.log('Command not available');
}