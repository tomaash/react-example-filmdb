process.env.NODE_PATH = "app";
require("module").Module._initPaths();
require("babel/register");

var _ = require("lodash");
var uncache = require("require-uncache");
var glob = require("glob").sync;
var Mocha = require("mocha");
var jsdom = require("jsdom");

global.sinon = require("sinon");
global.chai = require("chai");
global.chai.use(require("chai-spies"));
global.chai.use(require("sinon-chai"));
global.assert = global.chai.assert;
global.expect = global.chai.expect;
global.should = global.chai.should();

var filePatterns = _([
	"test/**/*spec.js",
	"app/**/*spec.js"
]);

function runTests() {
	// globals
	global.document = jsdom.jsdom();
	global.window = document.defaultView;
	global.navigator = global.window.navigator;
	global.location = global.window.location;
	global.localStorage = {
		getItem: _.noop,
		setItem: _.noop,
		removeItem: _.noop
	};

	DEBUG = false;
	global.navigator.userAgent = "NodeJs JsDom";
	global.navigator.appVersion = "";

	var mocha = new Mocha();
	mocha.reporter("spec").ui("bdd");
	var testFiles = filePatterns.reduce(function(sum, item) {
		return sum.concat(glob(item));
	}, []);

	mocha.suite.on("pre-require", function(context, file) {
		uncache(file);
	});

	testFiles.forEach(function(file) {
		mocha.addFile(file);
	});

	mocha.run();
};

runTests();

var argv = require("yargs").argv;
if (argv.w) {
	process.on("uncaughtException", function(err) {
		console.error(err.stack);
	});

	var chokidar = require("chokidar");
	chokidar.watch(["./app", "./test"], {ignored: /[\/\\]\./}).on("all", function(event, path) {
		if (event === "change") {
			console.log(event, path);
			runTests();
		}
	});
}
