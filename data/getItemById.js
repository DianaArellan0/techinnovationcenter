const Item = require('../models/item');

module.exports = async function getItemById(id){
    const itemFromDB = await Item.findById(id);
    return itemFromDB;
}