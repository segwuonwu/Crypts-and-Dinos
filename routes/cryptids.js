const express = require('express');
const router = express.Router();
const fs = require('fs');

// Index - Get route
router.get('/', (req, res) => {
    // Get all crypt, pass to page
    let allCrypt = fs.readFileSync('./cryptids.json');
    allCrypt = JSON.parse(allCrypt);
    console.log(allCrypt);

    res.render('cryptids/index', { cryptids: allCrypt });
})

// New - Get route
router.get('/new', (req, res) => {
    res.render('cryptids/new');
})

// Create - Post route
router.post('/', (req, res) => {
    // Read cryptids
    let crypt = fs.readFileSync('./cryptids.json');
    //JSON parse crypt
    crypt = JSON.parse(crypt);
    // Add req.body to the end of crypt
    crypt.push(req.body);
    // JSON stringify crypt
    let newCrypt = JSON.stringify(crypt);
    // write crypt
    fs.writeFileSync('./cryptids.json', newCrypt)

    // Redirect to show page for new crypt
    res.redirect(`/cryptids/${crypt.length - 1}`)
})

// Show - Get route
router.get('/:id', (req, res) => {
    // GET actual crypt at id of req.params.id
    let crypt = fs.readFileSync('./cryptids.json');
    crypt = JSON.parse(crypt);
    let cryptIndex = parseInt(req.params.id);
    let oneCrypt = crypt[cryptIndex];
    oneCrypt.id = cryptIndex;

    res.render('cryptids/show', { crypt: oneCrypt });
})

// Edit - Get route
router.get('/edit/:id', (req, res) => {
    let crypt = fs.readFileSync('./cryptids.json');
    crypt = JSON.parse(crypt);
    let cryptIndex = parseInt(req.params.id);
    let oneCrypt = crypt[cryptIndex];
    oneCrypt.id = cryptIndex;

    res.render('cryptids/edit', { crypt: oneCrypt });
})

// Update - Put route
router.put('/:id', (req, res) => {
    console.log(req.params.id)
    let crypt = fs.readFileSync('./cryptids.json');
    crypt = JSON.parse(crypt);

    //re-assign the name and type fields of the dino to be editted
    crypt[parseInt(req.params.id)] = req.body;
    //dinos[req.params.id].type = req.body.type;

    // save the editted dino to the dinosaurs.json file
    fs.writeFileSync('./cryptids.json', JSON.stringify(crypt));
    res.redirect(`/cryptids/${req.params.id}`);
});

// Destroy - Delete route
router.delete('/:id', (req, res) => {
    // Read cryptid
    let crypt = fs.readFileSync('./cryptids.json');
    //JSON parse crptid
    crypt = JSON.parse(crypt);
    // Remove crypt from array
    let deadCrypt = crypt.splice(req.params.id, 1);
    // Write JSON stringified version cryp
    fs.writeFileSync('./cryptids.json', JSON.stringify(crypt))

    console.log(`Press F to pay respect to ${deadCrypt[0].name}`);
    res.redirect('/cryptids');
})


//export router
module.exports = router;