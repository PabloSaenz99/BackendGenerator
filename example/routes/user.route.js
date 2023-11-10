const user = require("../controllers/user.controller.js");
const router = require("express").Router();

const trycatch = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
}

router.post("/", trycatch(user.createOrUpdate));
router.get("/id/:id", trycatch(user.findById));
router.delete("/id/:id", trycatch(user.deleteById));
router.post("/new", trycatch(user.create));
router.put("/update", trycatch(user.update));
router.get("/all", trycatch(user.findAll));
router.delete("/all", trycatch(user.deleteAll));
router.get("/findTrue", trycatch(user.findTrue));
router.post("/updateByEmail/:id", trycatch(user.updateByEmail));

module.exports = router;