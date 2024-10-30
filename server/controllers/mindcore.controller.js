const mindcore = require("../models/mindcore.model");


module.exports.createmindcore = (req, res) => {
    mindcore.create(req.body)
        .then(newmindcore => {
            res.status(201).json({ mindcore: newmindcore })
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
module.exports.findAllmindcores = (req, res) =>{
    mindcore.find()
        .then((allmindcores) => {
            res.json({mindcores : allmindcores})
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

module.exports.findOnemindcore = (req , res) => {
    mindcore.find({_id : req.params.id})
        .then(onemindcore => {
            res.json({mindcore : onemindcore})
        })
        .catch(err => {
            res.status(400).json(err)
        })
}
module.exports.updatemindcore = (req , res) => {
    mindcore.findOneAndUpdate({_id : req.params.id},
                            req.body,
                            { new : true, runValidators: true}
    )
        .then(updatemindcore =>{
            res.json({mindcore : updatemindcore})
        })
        .catch(err => {
            res.status(400).json(err)
        })   
}

module.exports.deletemindcore = (req , res) => {
    mindcore.deleteOne({_id : req.params.id})
    .then(result =>{
        res.json({result : result})
    })
    .catch(err => {
        res.status(400).json(err)
    })
}