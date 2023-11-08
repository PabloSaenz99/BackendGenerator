const fs = require('fs');

const defaultMethodsFile = "./files/defaultMethods.txt";
const defaultExtendedMethodsFile = "./files/defaultExtendedMethods.txt";
const serviceFunctionBody = "	return; //TODO: your query function here\n";

var fileBaseName = "notes"
//Arrays of arrays -> [get/post/delete, endpoint], name, req param
var customMethods = [
	[["get", "findTrue"], "findTrue"]
];
var defaultMethods = [
	[["post", ""], "createOrUpdate", "req.body"],
	[["get", "id/:id"], "findById", "req.params.id"],
	[["delete", "id/:id"], "deleteById", "req.params.id"],
];
var defaultExtendedMethods = [
	[["post", "new"], "create", "req.body"],
	[["put", "update"], "update", "req.body"],
	[["get", "all"], "findAll"],
	[["delete", "all"], "deleteAll"],
];

function initConfig(name, custom, customFile, defaultM, defaultExtended) {
	fileBaseName = name;
	if(defaultM) {
		defaultMethods = readFile(defaultMethodsFile);
	}
	else if(defaultExtended) {
		defaultMethods = readFile(defaultMethodsFile).concat(readFile(defaultExtendedMethodsFile));
	}
	if(custom) {
		customMethods = custom;
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
	
	//console.log(routerString);
	//console.log(controllerString);
	//console.log(serviceString);
	
	fs.writeFile(`./routes/${fileBaseName}.routes.js`, routerString, (err) => { 
		if (err) throw err; 
	});
	fs.writeFile(`./controllers/${fileBaseName}.controller.js`, controllerString, (err) => { 
		if (err) throw err; 
	});
	fs.writeFile(`./services/${fileBaseName}.service.js`, serviceString, (err) => { 
		if (err) throw err; 
	});
}

function createDefaultRoutes() {
	var res = "";
	res += `const ${fileBaseName} = require("../controllers/${fileBaseName}.controller.js");\n`;
	res += `const router = require("express").Router();\n\n`;
	
	res += `const trycatch = fn => (req, res, next) => {\n	Promise.resolve(fn(req, res, next)).catch(next);\n}\n\n`;

	return res;
}

function createDefaultController() {
	return `${fileBaseName}Service = require("../services/${fileBaseName}.service");\n\n`;
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
		res += `export async function ${s[1]}(${s[2]?s[2]: ""}){\n`;
		res += serviceFunctionBody;
		res += `};\n\n`;
	});	
	
	return res;
}

function readFile(filePath) {
	try {
		return fs.readFileSync(filePath, 'utf8').replaceAll(" ", "").replaceAll("\n", "").replaceAll("\t", "");
	} catch (err) {
		console.error(err);
	}
}

module.exports = {initConfig, controller, serviceFunctionBody}