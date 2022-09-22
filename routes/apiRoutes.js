const router = require('express').Router();
const storeData = require('../db/storeData.js');

router.get('/notes', (req, res) => {
    storeData
        .getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => {
            res.status(500).json(err);
        });

});

router.post('/notes', (req, res) => {
    storeData
        .addNotes(req.body)
        .then((note) => {
            res.json(note);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;