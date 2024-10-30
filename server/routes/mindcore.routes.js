const mindcoreController = require("../controllers/mindcore.controller");

module.exports = app =>{
    app.get('/',mindcoreController.findAllmindcores);
    app.get('/mindcores/:id', mindcoreController.findOnemindcore);
    app.patch('/mindcores/edit/:id', mindcoreController.updatemindcore);
    app.post('/mindcores/new', mindcoreController.createmindcore);
    app.delete('/mindcores/:id/delete', mindcoreController.deletemindcore);
}