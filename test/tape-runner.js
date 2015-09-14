process.env.NODE_PATH = "app";
require("module").Module._initPaths();
require("babel/register");

var _ = require("lodash");
var uncache = require("require-uncache");
var glob = require("glob").sync;
var jsdom = require("jsdom");
var pathUtils = require("path");

var filePatterns = _([
	"test/**/*test.js",
	"app/**/*test.js"
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

	var testFiles = filePatterns.reduce(function(sum, item) {
		return sum.concat(glob(item));
	}, []);

	uncache("tape");
	var test = require("tape");
	var faucet = require("faucet");
	// var tapSpec = require("tap-spec");

	test.createStream()
		.pipe(faucet())
		.pipe(process.stdout);

	testFiles.forEach(function(file) {
		const absPath = pathUtils.join(process.cwd(), file);
		uncache(absPath);
		require(absPath);
	});
}

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
