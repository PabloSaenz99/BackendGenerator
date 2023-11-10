#!/usr/bin/env node

const yargs = require("yargs");

const options = yargs
	.usage("Usage: -n <name> -<backend option> <optional args>")
	.option("n", { alias: "name", desc: "Adds the name of the service", type: "string", demandOption: true })
	.option("c", { alias: "custom", desc: "Adds the custom methods", type: "string", demandOption: false })
	.option("f", { alias: "customFile", desc: "Adds the custom methods using a file", type: "string", demandOption: false })
	.option("d", { alias: "default", desc: "Adds the default methods", type: "boolean", demandOption: false })
	.option("e", { alias: "defaultExtended", desc: "Adds the default methods and some more", type: "boolean", demandOption: false })
	.option("debug", { desc: "Show logs", type: "boolean", demandOption: false })
	.check((argv, options) => {
		const arguments = Object.keys(argv).length;
		var minArgs = (argv.debug? 2: 0) + 2;
		if (arguments <= minArgs) {
		  throw new Error("At least 1 arg must be passed: name and an option");
		} else if (arguments <= minArgs + 2) {
		  throw new Error("At least 2 args must be passed: name and an option");
		} else {
		  return true;
		}
	})
	.argv;

const {setDebugMode, logd} = require("./utils");
setDebugMode(options.debug);
logd(options)

const {initConfig, controller} = require("./generate-backend");

initConfig(options.name, options.custom, options.customFile, options.default, options.defaultExtended);
controller();