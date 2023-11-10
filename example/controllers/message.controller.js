const messageService = require("../services/message.service.js");

exports.createOrUpdate = async (req, res) => {
	res.send(await messageService.createOrUpdate(req.body));
};

exports.findById = async (req, res) => {
	res.send(await messageService.findById(req.params.id));
};

exports.deleteById = async (req, res) => {
	res.send(await messageService.deleteById(req.params.id));
};

exports.create = async (req, res) => {
	res.send(await messageService.create(req.body));
};

exports.update = async (req, res) => {
	res.send(await messageService.update(req.body));
};

exports.findAll = async (req, res) => {
	res.send(await messageService.findAll());
};

exports.deleteAll = async (req, res) => {
	res.send(await messageService.deleteAll());
};

