const fs = require("fs");

var debugEnabled = false;

function readFile(filePath) {
	try {
		return JSON.parse(fs.readFileSync(filePath, 'utf8').replaceAll("'", "\""));
	} catch (err) {
		console.error(err);
	}
}

function writeFile(path, fileBaseName, content) {
	let file = `./${path}/${fileBaseName}.${path.substring(path.lastIndexOf("/") + 1, path.length).slice(0, -1)}.js`;
	logd(file)

	fs.writeFile(file, content, { encoding: "utf8" }, (err) => {
		if (err) {
			if(err.code==='ENOENT') {
				fs.mkdirSync(`./${path}/`, { recursive: true });
				writeFile(path, fileBaseName, content);
			}
			else {
				throw err;
			}
		}
        else {
            //logd(content);
        }
	});
}

function setDebugMode(mode) {
    if(!debugEnabled) {
        debugEnabled = mode;
        logd("Debug: " + debugEnabled);
    }
}

function logd(content) {
    if(debugEnabled) {
        console.log(content);
    }
}

module.exports = { readFile, writeFile, setDebugMode, logd }