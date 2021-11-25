const router = require('express').Router();
const {v4: uuidv4} = require('uuid');

const { filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db');

router.get('/notes', (req, res) => {
    let results = notes;
    
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    
    res.json(results);
});

/*
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});
*/

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = uuidv4();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;
