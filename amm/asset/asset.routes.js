const router = require('express').Router();
const controller = require('./asset.controller');

router.get("/asset/:id", controller.getById);
router.get("/assets", controller.getAll);

module.exports = router;