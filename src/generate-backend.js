const { readFile, writeFile, logd } = require('./utils');

const defaultMethodsFile = "src/files/defaultMethods.txt";
const defaultExtendedMethodsFile = "src/files/defaultExtendedMethods.txt";
const serviceFunctionBody = "	return; //TODO: your query function here\n";

var filePath = "";
var fileBaseName = "";

//Arrays of arrays -> [get/post/delete, endpoint], name, req param
var customMethods = undefined;
var defaultMethods = undefined;
var defaultExtendedMethods = undefined;

function initConfig(name, custom, customFile, defaultM, defaultExtended) {
	filePath = name.substring(0, name.lastIndexOf("/") + 1);
	fileBaseName = name.substring(name.lastIndexOf("/") + 1, name.length);
	logd(fileBaseName);
	logd(filePath);

	if(defaultM) {
		defaultMethods = readFile(defaultMethodsFile);
	}
	else if(defaultExtended) {
		defaultMethods = readFile(defaultMethodsFile).concat(readFile(defaultExtendedMethodsFile));
	}
	if(custom) {
		customMethods = JSON.parse(custom.replaceAll("'", "\""));
	}
	else if(customFile) {
		customMethods = readFile(customFile)
	}
}

function controller() {
	var routerString = createDefaultRoutes();
	var controllerString = createDefaultController();
	var serviceString = createDefaultService();
	
	if(defaultMethods || defaultExtendedMethods) {
		if(defaultExtendedMethods) {
			defaultMethods.concat(defaultExtendedMethods);
		}
		routerString += createRoutes(defaultMethods);
		controllerString += createControllers(defaultMethods);
		serviceString += createServices(defaultMethods);
	}
	if(customMethods) {
		routerString += createRoutes(customMethods);
		controllerString += createControllers(customMethods);
		serviceString += createServices(customMethods);
	}
	
	routerString += "\nmodule.exports = router;";
	
	writeFile(filePath + "routes", fileBaseName, routerString);
	writeFile(filePath + "controllers", fileBaseName, controllerString);
	writeFile(filePath + "services", fileBaseName, serviceString);

	console.log("Backend data generated in " + fileBaseName);
}

function createDefaultRoutes() {
	var res = "";
	res += `const ${fileBaseName} = require("../controllers/${fileBaseName}.controller.js");\n`;
	res += `const router = require("express").Router();\n\n`;
	
	res += `const trycatch = fn => (req, res, next) => {\n	Promise.resolve(fn(req, res, next)).catch(next);\n}\n\n`;

	return res;
}

function createDefaultController() {
	return `const ${fileBaseName}Service = require("../services/${fileBaseName}.service.js");\n\n`;
}

function createDefaultService() {
	var res = "";
	res += `const db = require("TODO: add here your db access"); //Example:\n`;
	res += `//const db = require("../config/db.config");\n`;
	res += `const ${fileBaseName} = db.${fileBaseName};\n\n`;
	
	return res;
}

function createRoutes(routes) {
	var res = "";
	routes.forEach(r => {
		res += `router.${r[0][0]}("/${r[0][1]}", trycatch(${fileBaseName}.${r[1]}));\n`;
	});
	return res;
}

function createControllers(controllers) {
	var res = "";
	controllers.forEach(c => {
		res += `exports.${c[1]} = async (req, res) => {\n`;
		res += `	res.send(await ${fileBaseName}Service.${c[1]}(${c[2]?c[2]: ""}));\n`;
		res += `};\n\n`
	});
	return res;
}

function createServices(services) {
	var res = "";
	services.forEach(s => {
		res += `export async function ${s[1]}(${s[2]?"param": ""}){\n`;
		res += serviceFunctionBody;
		res += `};\n\n`;
	});	
	
	return res;
}

module.exports = {initConfig, controller, serviceFunctionBody}