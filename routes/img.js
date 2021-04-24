const express = require('express');
const router = express.Router();

const path = require('path');
//IMAGE PATH
const imgFolderPath = path.join(__dirname, '../img/');

//Images
router.get('/:imagName', (req, res) => {
    const image = req.params.imagName;
    res.sendFile(`${imgFolderPath}${image}`)
})

module.exports = router;