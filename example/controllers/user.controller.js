const userService = require("../services/user.service.js");

exports.createOrUpdate = async (req, res) => {
	res.send(await userService.createOrUpdate(req.body));
};

exports.findById = async (req, res) => {
	res.send(await userService.findById(req.params.id));
};

exports.deleteById = async (req, res) => {
	res.send(await userService.deleteById(req.params.id));
};

exports.create = async (req, res) => {
	res.send(await userService.create(req.body));
};

exports.update = async (req, res) => {
	res.send(await userService.update(req.body));
};

exports.findAll = async (req, res) => {
	res.send(await userService.findAll());
};

exports.deleteAll = async (req, res) => {
	res.send(await userService.deleteAll());
};

exports.findTrue = async (req, res) => {
	res.send(await userService.findTrue());
};

exports.updateByEmail = async (req, res) => {
	res.send(await userService.updateByEmail(req.body));
};

