#!/usr/bin/env node

const yargs = require("yargs");

const options = yargs
	.usage("Usage: -n <name>")
	.option("n", { alias: "name", desc: "Adds the name of the service", type: "string", demandOption: true })
	.option("c", { alias: "custom", desc: "Adds the custom methods", type: "array", demandOption: false })
	.option("f", { alias: "custom-file", desc: "Adds the custom methods using a file", type: "string", demandOption: false })
	.option("d", { alias: "default", desc: "Adds the default methods", type: "string", demandOption: false })
	.option("e", { alias: "default-extended", desc: "Adds the default methods and some more", type: "string", demandOption: false })
	.check((argv, options) => {
		const filePaths = argv._;
		if (filePaths.length < 1) {
		  throw new Error("At least 1 arg must be passed: name and an option");
		} else if (filePaths.length < 2) {
		  throw new Error("At least 2 args must be passed: name and an option");
		} else {
		  return true;
		}
	})
	.argv;

console.log(options);

const {initConfig, controller} = require("./generate-backend");

initConfig(options.name, options.custom, options.custom-file, options.default, options.default-extended);
controller();