module.exports = `const models = require('../models');

exports.main = (req,res) => {
    res.status(200).json({message:"Hello world from Semplice"})
}
                                                        `