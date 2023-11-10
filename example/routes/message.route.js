const message = require("../controllers/message.controller.js");
const router = require("express").Router();

const trycatch = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
}

router.post("/", trycatch(message.createOrUpdate));
router.get("/id/:id", trycatch(message.findById));
router.delete("/id/:id", trycatch(message.deleteById));
router.post("/new", trycatch(message.create));
router.put("/update", trycatch(message.update));
router.get("/all", trycatch(message.findAll));
router.delete("/all", trycatch(message.deleteAll));

module.exports = router;