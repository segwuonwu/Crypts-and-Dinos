const express = require("express");
const router = express.Router();
const fs = require('fs');

// Index - Get route
router.get('/', (req, res) => {
    // Get all dinos, pass to page
    let allDinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(allDinos);
    console.log(dinoData);

    res.render('dinos/index', { dinos: dinoData });
})

// New - Get route
router.get('/new', (req, res) => {
    res.render('dinos/new');
})

// Create - Post route
router.post('/', (req, res) => {
    console.log('🍑');
    console.log(req.body);
    // Read Dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    //JSON parse dinos
    let dinoData = JSON.parse(dinos);
    // Add req.body to the end of dino
    dinoData.push(req.body);
    // JSON stringify dino
    let newDinos = JSON.stringify(dinoData);
    // write dinos
    fs.writeFileSync('./dinosaurs.json', newDinos)

    // Redirect to show page for new dino
    res.redirect(`/dinos/${dinoData.length - 1}`)
})

// Show - Get route
router.get('/:id', (req, res) => {
    // TODO GET actual dino at id of req.params.id
    let dinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinoData[dinoIndex];
    oneDino.id = dinoIndex;

    res.render('dinos/show', { dino: oneDino });
})

// Edit - Get route
router.get('/edit/:id', (req, res) => {
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinos[dinoIndex];
    oneDino.id = dinoIndex;

    res.render('dinos/edit', { dino: oneDino });
})

// Update - Put route
router.put('/:id', (req, res) => {
    console.log(req.params.id)
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);

    //re-assign the name and type fields of the dino to be editted
    dinos[parseInt(req.params.id)] = req.body;
    //dinos[req.params.id].type = req.body.type;

    // save the editted dino to the dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    res.redirect(`/dinos/${req.params.id}`);
});

// Destroy - Delete route
router.delete('/:id', (req, res) => {
    // Read Dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    //JSON parse dinos
    dinos = JSON.parse(dinos);
    // Remove dino from array
    let deadDino = dinos.splice(req.params.id, 1);
    // Write JSON stringified version dinos
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))

    console.log(`Press F to pay respect to ${deadDino[0].name}`);
    res.redirect('/dinos');
})

module.exports = router;